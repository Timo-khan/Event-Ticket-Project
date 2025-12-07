import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.js";
import Listing from "../models/Listing.js";
import Order from "../models/Order.js";
import { z } from "zod";

const checkoutSchema = z.object({
	items: z.array(
		z.object({
			listingId: z.string(),
			quantity: z.number().min(1),
		})
	),
});

export async function checkout(req: AuthedRequest, res: Response) {
	const parsed = checkoutSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json(parsed.error.flatten());

	const itemsInput = parsed.data.items;

	const listings = await Listing.find({
		_id: { $in: itemsInput.map((i) => i.listingId) },
		status: "active",
	});

	if (listings.length !== itemsInput.length)
		return res.status(400).json({ message: "Some listings unavailable" });

	const items = listings.map((l) => {
		const qty = itemsInput.find((i) => i.listingId === String(l._id))!.quantity;
		return {
			listingId: l._id,
			eventId: l.eventId,
			quantity: qty,
			priceEach: l.priceEach,
		};
	});

	const subtotal = items.reduce((s, i) => s + i.quantity * i.priceEach, 0);
	const fees = Math.round(subtotal * 0.12); // TickPick-style fees (placeholder)
	const total = subtotal + fees;

	const order = await Order.create({
		buyerId: req.user!.id,
		items,
		subtotal,
		fees,
		total,
		paymentStatus: "paid", // mock immediate pay
	});

	// mark listings sold if fully purchased (simplified)
	for (const i of items) {
		const l = listings.find((x) => String(x._id) === String(i.listingId))!;
		l.quantity -= i.quantity;
		if (l.quantity <= 0) l.status = "sold";
		await l.save();
	}

	res.status(201).json(order);
}

export async function myOrders(req: AuthedRequest, res: Response) {
	const orders = await Order.find({ buyerId: req.user!.id })
		.populate("items.eventId")
		.sort({ createdAt: -1 });
	res.json(orders);
}
