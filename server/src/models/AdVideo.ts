import mongoose, { Schema, InferSchemaType } from "mongoose";

const adVideoSchema = new Schema(
	{
		title: { type: String, required: true },
		srcUrl: { type: String, required: true }, // stored URL (public or internal)
		active: { type: Boolean, default: true },
		notes: String,
	},
	{ timestamps: true }
);

export type AdVideo = InferSchemaType<typeof adVideoSchema>;
export default mongoose.model<AdVideo>("AdVideo", adVideoSchema);
