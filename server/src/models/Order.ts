import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const orderSchema = new Schema(
	{
		buyerId: { type: Types.ObjectId, ref: "User", required: true },
		items: [
			{
				listingId: { type: Types.ObjectId, ref: "Listing", required: true },
				eventId: { type: Types.ObjectId, ref: "Event", required: true },
				quantity: { type: Number, required: true },
				priceEach: { type: Number, required: true },
			},
		],
		subtotal: Number,
		fees: Number,
		total: Number,
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

export type Order = InferSchemaType<typeof orderSchema>;
export default mongoose.model<Order>("Order", orderSchema);
