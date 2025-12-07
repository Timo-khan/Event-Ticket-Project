import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { connectDB } from "../config/db.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

// Single source of truth (can be overridden by .env)
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@tickpick.local";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "admin123";
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Admin";

async function seedAdmin() {
	const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

	// Upsert: guarantees admin exists with these exact creds every run
	const admin = await User.findOneAndUpdate(
		{ email: ADMIN_EMAIL },
		{
			name: ADMIN_NAME,
			email: ADMIN_EMAIL,
			passwordHash,
			role: "admin",
		},
		{ upsert: true, new: true }
	);

	console.log("Admin seeded/updated:");
	console.log("   email:", ADMIN_EMAIL);
	console.log("   password:", ADMIN_PASSWORD);
	console.log("   role:", admin.role);
}

async function seedEvents() {
	// Safe to reset demo events each run
	await Event.deleteMany({});

	await Event.insertMany([
		{
			title: "New York Jets vs LA Rams",
			category: "sports",
			venue: "MetLife Stadium",
			city: "East Rutherford, NJ",
			date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
			heroImage:
				"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600",
			minPrice: 68,
		},
		{
			title: "Zach Bryan Live",
			category: "concert",
			venue: "Madison Square Garden",
			city: "New York, NY",
			date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25),
			heroImage:
				"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600",
			minPrice: 120,
		},
		{
			title: "Brandy Reunion Tour",
			category: "concert",
			venue: "Barclays Center",
			city: "Brooklyn, NY",
			date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40),
			heroImage:
				"https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600",
			minPrice: 95,
		},
	]);

	console.log("Events seeded");
}

async function runSeed() {
	try {
		await connectDB(process.env.MONGODB_URI!);

		await seedAdmin();
		await seedEvents();

		console.log("Seeded DB");
	} catch (err) {
		console.error("Seed failed:", err);
	} finally {
		await mongoose.disconnect();
		process.exit(0);
	}
}

runSeed();
