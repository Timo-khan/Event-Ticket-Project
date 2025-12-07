import { useAuthStore } from "../store/auth.store";
import { useCartStore } from "../store/cart.store";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
	const user = useAuthStore((s) => s.user);
	const { items, clear } = useCartStore();
	const nav = useNavigate();

	if (!user)
		return (
			<div className="container" style={{ padding: 30 }}>
				Please log in to checkout.
			</div>
		);

	const placeOrder = async () => {
		const payload = {
			items: items.map((i) => ({
				listingId: i.listingId,
				quantity: i.quantity,
			})),
		};
		await api.post("/orders/checkout", payload);
		clear();
		nav("/orders");
	};

	return (
		<div
			className="container"
			style={{ padding: "22px 0 60px", maxWidth: 720 }}
		>
			<h2 style={{ margin: 0, fontWeight: 900 }}>Checkout</h2>
			<div className="card" style={{ padding: 14, marginTop: 12 }}>
				<div style={{ fontWeight: 900 }}>Payment</div>
				<p style={{ color: "var(--muted)" }}>
					This demo uses a mock payment. Stripe can be added next.
				</p>
				<button
					onClick={placeOrder}
					style={{
						width: "100%",
						padding: "12px 14px",
						borderRadius: 10,
						border: "none",
						background: "var(--blue)",
						color: "white",
						fontWeight: 800,
					}}
				>
					Pay & Place Order
				</button>
			</div>
		</div>
	);
}
