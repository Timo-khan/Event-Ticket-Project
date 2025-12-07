import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { z } from "zod";

const signupSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

export async function signup(req: Request, res: Response) {
	const parsed = signupSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json(parsed.error.flatten());

	const { name, email, password } = parsed.data;
	const exists = await User.findOne({ email });
	if (exists) return res.status(409).json({ message: "Email already used" });

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ name, email, passwordHash });

	const token = jwt.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECRET!,
		{
			expiresIn: "7d",
		}
	);

	res.json({
		token,
		user: { id: user._id, name: user.name, email: user.email, role: user.role },
	});
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export async function login(req: Request, res: Response) {
	const parsed = loginSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json(parsed.error.flatten());

	const { email, password } = parsed.data;
	const user = await User.findOne({ email });
	if (!user) return res.status(401).json({ message: "Invalid credentials" });

	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) return res.status(401).json({ message: "Invalid credentials" });

	const token = jwt.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECRET!,
		{
			expiresIn: "7d",
		}
	);

	res.json({
		token,
		user: { id: user._id, name: user.name, email: user.email, role: user.role },
	});
}

export async function me(req: any, res: Response) {
	const user = await User.findById(req.user.id).select("-passwordHash");
	res.json(user);
}
