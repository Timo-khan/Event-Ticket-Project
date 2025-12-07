import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		passwordHash: { type: String, required: true },
		role: { type: String, enum: ["user", "admin"], default: "user" },
	},
	{ timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;
export default mongoose.model<User>("User", userSchema);
