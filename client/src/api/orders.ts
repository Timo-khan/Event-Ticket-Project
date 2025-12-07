import { api } from "./client";
import type { Event } from "./events";

export type CheckoutItemInput = {
	listingId: string;
	quantity: number;
};

export type OrderItem = {
	listingId: string;
	eventId: Event; // populated from backend
	quantity: number;
	priceEach: number;
};

export type Order = {
	_id: string;
	buyerId: string;
	items: OrderItem[];
	subtotal: number;
	fees: number;
	total: number;
	paymentStatus: "pending" | "paid" | "failed";
	createdAt: string;
};

export async function checkout(items: CheckoutItemInput[]) {
	const res = await api.post<Order>("/orders/checkout", { items });
	return res.data;
}

export async function fetchMyOrders() {
	const res = await api.get<Order[]>("/orders/mine");
	return res.data;
}
