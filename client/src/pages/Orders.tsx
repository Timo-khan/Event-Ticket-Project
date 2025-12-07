import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth.store";

export default function Orders() {
	const user = useAuthStore((s) => s.user);
	const [orders, setOrders] = useState<any[]>([]);

	useEffect(() => {
		if (user) api.get("/orders/mine").then((r) => setOrders(r.data));
	}, [user]);

	if (!user)
		return (
			<div className="container" style={{ padding: 30 }}>
				Log in to see orders.
			</div>
		);

	return (
		<div className="container" style={{ padding: "22px 0 60px" }}>
			<h2 style={{ margin: 0, fontWeight: 900 }}>My Orders</h2>

			<div style={{ display: "grid", gap: 10, marginTop: 12 }}>
				{orders.map((o) => (
					<div key={o._id} className="card" style={{ padding: 14 }}>
						<div style={{ fontWeight: 900 }}>Order #{o._id.slice(-6)}</div>
						<div style={{ color: "var(--muted)", fontSize: 13 }}>
							{new Date(o.createdAt).toLocaleString()} •{" "}
							{o.paymentStatus.toUpperCase()}
						</div>
						<div style={{ marginTop: 8, display: "grid", gap: 6 }}>
							{o.items.map((it: any, idx: number) => (
								<div
									key={idx}
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<span>
										{it.eventId?.title} × {it.quantity}
									</span>
									<span>${it.priceEach * it.quantity}</span>
								</div>
							))}
						</div>
						<div style={{ marginTop: 8, fontWeight: 900, fontSize: 18 }}>
							Total: ${o.total}
						</div>
					</div>
				))}
				{orders.length === 0 && (
					<div className="card" style={{ padding: 20 }}>
						No orders yet.
					</div>
				)}
			</div>
		</div>
	);
}
