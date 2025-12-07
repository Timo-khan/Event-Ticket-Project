import { create } from "zustand";

export type CartItem = {
	listingId: string;
	eventId: string;
	title: string;
	section: string;
	row: string;
	seats: string[];
	quantity: number;
	priceEach: number;
};

type CartState = {
	items: CartItem[];
	add: (item: CartItem) => void;
	remove: (listingId: string) => void;
	clear: () => void;
	setQty: (listingId: string, quantity: number) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	add: (item) => {
		const existing = get().items.find((i) => i.listingId === item.listingId);
		if (existing) {
			set({
				items: get().items.map((i) =>
					i.listingId === item.listingId
						? { ...i, quantity: i.quantity + item.quantity }
						: i
				),
			});
		} else set({ items: [...get().items, item] });
	},
	remove: (listingId) =>
		set({ items: get().items.filter((i) => i.listingId !== listingId) }),
	clear: () => set({ items: [] }),
	setQty: (listingId, quantity) =>
		set({
			items: get().items.map((i) =>
				i.listingId === listingId ? { ...i, quantity } : i
			),
		}),
}));
