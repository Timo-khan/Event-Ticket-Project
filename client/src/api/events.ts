import { api } from "./client";

export type Event = {
	_id: string;
	title: string;
	category: "sports" | "concert" | "theater" | "comedy";
	venue: string;
	city: string;
	date: string;
	heroImage?: string;
	minPrice: number;
};

export type Listing = {
	_id: string;
	eventId: string;
	sellerId: string;
	section: string;
	row: string;
	seats: string[];
	quantity: number;
	priceEach: number;
	notes?: string;
	status: "active" | "sold" | "removed";
};

export async function fetchEvents(params?: { q?: string; category?: string }) {
	const res = await api.get<Event[]>("/events", { params });
	return res.data;
}

export async function fetchEventDetail(eventId: string) {
	const res = await api.get<{ event: Event; listings: Listing[] }>(
		`/events/${eventId}`
	);
	return res.data;
}
