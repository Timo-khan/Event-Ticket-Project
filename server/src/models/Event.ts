import mongoose, { Schema, InferSchemaType } from "mongoose";

const eventSchema = new Schema(
	{
		title: { type: String, required: true },
		category: {
			type: String,
			enum: ["sports", "concert", "theater", "comedy"],
			required: true,
		},
		venue: { type: String, required: true },
		city: { type: String, required: true },
		date: { type: Date, required: true },
		heroImage: String,
		minPrice: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export type Event = InferSchemaType<typeof eventSchema>;
export default mongoose.model<Event>("Event", eventSchema);
