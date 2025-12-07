import { Request, Response } from "express";
import Event from "../models/Event.js";
import Listing from "../models/Listing.js";

export async function listEvents(req: Request, res: Response) {
	const q = (req.query.q as string) || "";
	const category = (req.query.category as string) || "";

	const filter: any = {};
	if (q) filter.title = { $regex: q, $options: "i" };
	if (category) filter.category = category;

	const events = await Event.find(filter).sort({ date: 1 }).limit(200);
	res.json(events);
}

export async function getEvent(req: Request, res: Response) {
	const event = await Event.findById(req.params.id);
	if (!event) return res.status(404).json({ message: "Event not found" });

	const listings = await Listing.find({ eventId: event._id, status: "active" })
		.sort({ priceEach: 1 })
		.limit(500);

	res.json({ event, listings });
}
