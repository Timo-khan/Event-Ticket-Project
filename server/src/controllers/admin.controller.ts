import { Request, Response } from "express";
import AdVideo from "../models/AdVideo.js";
import Event from "../models/Event.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";
import { z } from "zod";

/* ---------------- ADS ---------------- */

const createAdSchema = z.object({
	title: z.string().min(1),
	srcUrl: z.string().url(),
	active: z.boolean().optional(),
	notes: z.string().optional(),
});

export async function listAds(req: Request, res: Response) {
	const ads = await AdVideo.find().sort({ createdAt: -1 });
	res.json(ads);
}

export async function createAd(req: Request, res: Response) {
	const parsed = createAdSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json(parsed.error.flatten());

	const ad = await AdVideo.create(parsed.data);
	res.status(201).json(ad);
}

export async function deleteAd(req: Request, res: Response) {
	await AdVideo.findByIdAndDelete(req.params.id);
	res.json({ ok: true });
}

/* ---------------- EVENTS (basic) ---------------- */

export async function adminListEvents(req: Request, res: Response) {
	const events = await Event.find().sort({ date: 1 });
	res.json(events);
}

export async function adminDeleteEvent(req: Request, res: Response) {
	await Event.findByIdAndDelete(req.params.id);
	await Listing.deleteMany({ eventId: req.params.id }); // cleanup listings
	res.json({ ok: true });
}

/* ---------------- LISTINGS (moderation) ---------------- */

export async function adminListListings(req: Request, res: Response) {
	const listings = await Listing.find()
		.populate("eventId")
		.populate("sellerId");
	res.json(listings);
}

export async function adminRemoveListing(req: Request, res: Response) {
	await Listing.findByIdAndUpdate(req.params.id, { status: "removed" });
	res.json({ ok: true });
}

/* ---------------- USERS (view) ---------------- */

export async function adminListUsers(req: Request, res: Response) {
	const users = await User.find()
		.select("-passwordHash")
		.sort({ createdAt: -1 });
	res.json(users);
}

/* ---------------- PUBLIC ADS ---------------- */

// Returns the latest active ad (public endpoint)
export async function getActiveAd(req: Request, res: Response) {
	const ad = await AdVideo.findOne({ active: true }).sort({ createdAt: -1 });
	res.json(ad); // can be null
}

/* ---------------- ADS UPLOAD (admin-only) ---------------- */

export async function uploadAd(req: Request, res: Response) {
	const file = (req as any).file as Express.Multer.File | undefined;
	if (!file) return res.status(400).json({ message: "No file uploaded" });

	const { title = file.originalname, notes } = req.body;

	const srcUrl = `/uploads/ads/${file.filename}`;

	const ad = await AdVideo.create({
		title,
		srcUrl,
		notes,
		active: true,
	});

	res.status(201).json(ad);
}
