import multer from "multer";
import path from "path";
import fs from "fs";

const adsDir = path.join(process.cwd(), "uploads", "ads");
fs.mkdirSync(adsDir, { recursive: true });

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, adsDir),
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname);
		const name = file.originalname
			.replace(ext, "")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.slice(0, 40);

		cb(null, `${Date.now()}-${name}${ext}`);
	},
});

function fileFilter(
	_req: any,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) {
	if (!file.mimetype.startsWith("video/")) {
		return cb(new Error("Only video files are allowed"));
	}
	cb(null, true);
}

export const uploadAdVideo = multer({
	storage,
	fileFilter,
	limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
});
