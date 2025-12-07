import { api } from "./client";
import type { Listing } from "./events";

export type CreateListingInput = {
	eventId: string;
	section: string;
	row: string;
	seats: string[]; // ["12", "13"]
	quantity: number; // total tickets
	priceEach: number; // per ticket
	notes?: string;
};

export async function createListing(input: CreateListingInput) {
	const res = await api.post<Listing>("/listings", input);
	return res.data;
}

export async function fetchMyListings() {
	const res = await api.get<Listing[]>("/listings/mine");
	return res.data;
}
