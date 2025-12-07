import { Response } from "express";
import Listing from "../models/Listing.js";
import Event from "../models/Event.js";
import { AuthedRequest } from "../middleware/auth.js";
import { z } from "zod";

const createListingSchema = z.object({
	eventId: z.string(),
	section: z.string().min(1),
	row: z.string().min(1),
	seats: z.array(z.string()).min(1),
	quantity: z.number().min(1),
	priceEach: z.number().min(1),
	notes: z.string().optional(),
});

export async function createListing(req: AuthedRequest, res: Response) {
	const parsed = createListingSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json(parsed.error.flatten());

	const data = parsed.data;
	const event = await Event.findById(data.eventId);
	if (!event) return res.status(404).json({ message: "Event not found" });

	const listing = await Listing.create({
		...data,
		sellerId: req.user!.id,
	});

	// update min price on event (simple)
	const min = await Listing.find({ eventId: data.eventId, status: "active" })
		.sort({ priceEach: 1 })
		.limit(1);
	event.minPrice = min[0]?.priceEach ?? event.minPrice;
	await event.save();

	res.status(201).json(listing);
}

export async function myListings(req: AuthedRequest, res: Response) {
	const listings = await Listing.find({ sellerId: req.user!.id }).populate(
		"eventId"
	);
	res.json(listings);
}
