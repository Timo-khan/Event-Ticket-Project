import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Sell() {
	const user = useAuthStore((s) => s.user);
	const nav = useNavigate();

	const [events, setEvents] = useState<any[]>([]);
	const [form, setForm] = useState<any>({
		eventId: "",
		section: "",
		row: "",
		seats: "",
		quantity: 1,
		priceEach: 50,
		notes: "",
	});

	useEffect(() => {
		api.get("/events").then((r) => setEvents(r.data));
	}, []);

	if (!user)
		return (
			<div className="container" style={{ padding: 30 }}>
				<h2>Sell Tickets</h2>
				<p>You need an account to list tickets.</p>
				<button
					onClick={() => nav("/login")}
					style={{
						padding: 10,
						borderRadius: 8,
						border: "1px solid var(--border)",
					}}
				>
					Log in
				</button>
			</div>
		);

	const submit = async (e: any) => {
		e.preventDefault();
		const payload = {
			...form,
			seats: form.seats.split(",").map((s: string) => s.trim()),
			quantity: Number(form.quantity),
			priceEach: Number(form.priceEach),
		};
		await api.post("/listings", payload);
		nav("/events/" + form.eventId);
	};

	return (
		<div
			className="container"
			style={{ padding: "22px 0 60px", maxWidth: 720 }}
		>
			<h2 style={{ margin: 0, fontWeight: 900 }}>Sell Tickets</h2>
			<p style={{ color: "var(--muted)", fontWeight: 600 }}>
				List your seats in minutes.
			</p>

			<form
				onSubmit={submit}
				className="card"
				style={{ padding: 16, display: "grid", gap: 10 }}
			>
				<label>
					Event
					<select
						required
						value={form.eventId}
						onChange={(e) => setForm({ ...form, eventId: e.target.value })}
						style={{
							width: "100%",
							padding: 10,
							borderRadius: 8,
							border: "1px solid var(--border)",
						}}
					>
						<option value="">Select event…</option>
						{events.map((ev) => (
							<option key={ev._id} value={ev._id}>
								{ev.title}
							</option>
						))}
					</select>
				</label>

				<div
					style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
				>
					<label>
						Section
						<input
							required
							value={form.section}
							onChange={(e) => setForm({ ...form, section: e.target.value })}
							style={{
								width: "100%",
								padding: 10,
								borderRadius: 8,
								border: "1px solid var(--border)",
							}}
						/>
					</label>
					<label>
						Row
						<input
							required
							value={form.row}
							onChange={(e) => setForm({ ...form, row: e.target.value })}
							style={{
								width: "100%",
								padding: 10,
								borderRadius: 8,
								border: "1px solid var(--border)",
							}}
						/>
					</label>
				</div>

				<label>
					Seats (comma separated)
					<input
						required
						value={form.seats}
						onChange={(e) => setForm({ ...form, seats: e.target.value })}
						placeholder="12,13,14"
						style={{
							width: "100%",
							padding: 10,
							borderRadius: 8,
							border: "1px solid var(--border)",
						}}
					/>
				</label>

				<div
					style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
				>
					<label>
						Quantity
						<input
							type="number"
							min={1}
							required
							value={form.quantity}
							onChange={(e) => setForm({ ...form, quantity: e.target.value })}
							style={{
								width: "100%",
								padding: 10,
								borderRadius: 8,
								border: "1px solid var(--border)",
							}}
						/>
					</label>
					<label>
						Price each ($)
						<input
							type="number"
							min={1}
							required
							value={form.priceEach}
							onChange={(e) => setForm({ ...form, priceEach: e.target.value })}
							style={{
								width: "100%",
								padding: 10,
								borderRadius: 8,
								border: "1px solid var(--border)",
							}}
						/>
					</label>
				</div>

				<label>
					Notes (optional)
					<input
						value={form.notes}
						onChange={(e) => setForm({ ...form, notes: e.target.value })}
						style={{
							width: "100%",
							padding: 10,
							borderRadius: 8,
							border: "1px solid var(--border)",
						}}
					/>
				</label>

				<button
					style={{
						marginTop: 6,
						padding: "12px 14px",
						borderRadius: 10,
						border: "none",
						background: "var(--blue)",
						color: "white",
						fontWeight: 800,
						cursor: "pointer",
					}}
				>
					Publish listing
				</button>
			</form>
		</div>
	);
}
