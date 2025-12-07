import { useCartStore } from "../store/cart.store";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
	const { items, remove, setQty } = useCartStore();
	const nav = useNavigate();

	const subtotal = items.reduce((s, i) => s + i.priceEach * i.quantity, 0);
	const fees = Math.round(subtotal * 0.12);
	const total = subtotal + fees;

	return (
		<div className="container" style={{ padding: "22px 0 60px" }}>
			<h2 style={{ margin: 0, fontWeight: 900 }}>Cart</h2>

			{items.length === 0 ? (
				<div className="card" style={{ padding: 20, marginTop: 12 }}>
					Your cart is empty.{" "}
					<Link to="/events" style={{ color: "var(--blue)", fontWeight: 800 }}>
						Browse events.
					</Link>
				</div>
			) : (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr",
						gap: 14,
						marginTop: 12,
					}}
				>
					<div style={{ display: "grid", gap: 10 }}>
						{items.map((i) => (
							<div
								className="card"
								key={i.listingId}
								style={{
									padding: 14,
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div>
									<div style={{ fontWeight: 900 }}>{i.title}</div>
									<div style={{ color: "var(--muted)", fontSize: 13 }}>
										{i.section} • Row {i.row} • Seats {i.seats.join(", ")}
									</div>
								</div>
								<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
									<input
										type="number"
										min={1}
										value={i.quantity}
										onChange={(e) =>
											setQty(i.listingId, Number(e.target.value))
										}
										style={{
											width: 60,
											padding: 8,
											borderRadius: 8,
											border: "1px solid var(--border)",
										}}
									/>
									<div style={{ fontWeight: 900 }}>${i.priceEach}</div>
									<button onClick={() => remove(i.listingId)} className="ghost">
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="card" style={{ padding: 14, height: "fit-content" }}>
						<div style={{ fontWeight: 900 }}>Summary</div>
						<div
							style={{ display: "grid", gap: 6, marginTop: 8, fontWeight: 700 }}
						>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<span>Subtotal</span>
								<span>${subtotal}</span>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<span>Fees</span>
								<span>${fees}</span>
							</div>
							<hr style={{ borderColor: "var(--border)" }} />
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: 18,
								}}
							>
								<span>Total</span>
								<span>${total}</span>
							</div>
						</div>
						<button
							onClick={() => nav("/checkout")}
							style={{
								marginTop: 10,
								width: "100%",
								padding: "12px 14px",
								borderRadius: 10,
								border: "none",
								background: "var(--blue)",
								color: "white",
								fontWeight: 800,
							}}
						>
							Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
