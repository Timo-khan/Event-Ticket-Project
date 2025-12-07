import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const listingSchema = new Schema(
	{
		eventId: { type: Types.ObjectId, ref: "Event", required: true },
		sellerId: { type: Types.ObjectId, ref: "User", required: true },
		section: { type: String, required: true },
		row: { type: String, required: true },
		seats: { type: [String], required: true },
		quantity: { type: Number, required: true, min: 1 },
		priceEach: { type: Number, required: true, min: 1 },
		notes: String,
		status: {
			type: String,
			enum: ["active", "sold", "removed"],
			default: "active",
		},
	},
	{ timestamps: true }
);

export type Listing = InferSchemaType<typeof listingSchema>;
export default mongoose.model<Listing>("Listing", listingSchema);
