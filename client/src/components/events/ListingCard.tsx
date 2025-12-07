import { useCartStore } from "../../store/cart.store";

export default function ListingCard({ l, event }: { l: any; event: any }) {
	const add = useCartStore((s) => s.add);
	return (
		<div
			className="card"
			style={{
				padding: 14,
				display: "grid",
				gridTemplateColumns: "1fr auto",
				gap: 10,
			}}
		>
			<div>
				<div style={{ fontWeight: 900 }}>
					{l.section} • Row {l.row}
				</div>
				<div style={{ color: "var(--muted)", fontSize: 13 }}>
					Seats: {l.seats.join(", ")} • Qty {l.quantity}
				</div>
				{l.notes && (
					<div style={{ marginTop: 6, fontSize: 13 }}>Note: {l.notes}</div>
				)}
			</div>
			<div style={{ textAlign: "right" }}>
				<div style={{ fontWeight: 900, fontSize: 18 }}>${l.priceEach}</div>
				<div style={{ fontSize: 12, color: "var(--muted)" }}>/ticket</div>
				<button
					onClick={() =>
						add({
							listingId: l._id,
							eventId: event._id,
							title: event.title,
							section: l.section,
							row: l.row,
							seats: l.seats,
							quantity: 1,
							priceEach: l.priceEach,
						})
					}
					style={{
						marginTop: 8,
						width: 120,
						padding: "10px 12px",
						borderRadius: 10,
						border: "none",
						background: "var(--blue)",
						color: "white",
						fontWeight: 800,
						cursor: "pointer",
					}}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}
