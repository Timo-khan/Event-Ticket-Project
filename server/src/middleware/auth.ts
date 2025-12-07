import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
	user?: { id: string; role: string };
}

export function requireAuth(
	req: AuthedRequest,
	res: Response,
	next: NextFunction
) {
	const header = req.headers.authorization;
	if (!header?.startsWith("Bearer "))
		return res.status(401).json({ message: "Unauthorized" });

	try {
		const token = header.slice(7);
		const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
		req.user = { id: payload.id, role: payload.role };
		next();
	} catch {
		return res.status(401).json({ message: "Invalid token" });
	}
}

export function requireAdmin(
	req: AuthedRequest,
	res: Response,
	next: NextFunction
) {
	if (req.user?.role !== "admin")
		return res.status(403).json({ message: "Forbidden" });
	next();
}
