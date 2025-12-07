import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";
import ListingCard from "../components/events/ListingCard";

export default function EventDetail() {
	const { id } = useParams();
	const [event, setEvent] = useState<any>(null);
	const [listings, setListings] = useState<any[]>([]);

	useEffect(() => {
		api.get(`/events/${id}`).then((r) => {
			setEvent(r.data.event);
			setListings(r.data.listings);
		});
	}, [id]);

	if (!event)
		return (
			<div className="container" style={{ padding: 30 }}>
				Loading…
			</div>
		);

	return (
		<div>
			<div
				style={{
					height: 280,
					backgroundImage: `url(${event.heroImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<div
				className="container"
				style={{ marginTop: -40, position: "relative" }}
			>
				<div
					className="card"
					style={{
						padding: 18,
						display: "flex",
						justifyContent: "space-between",
						gap: 12,
					}}
				>
					<div>
						<h2 style={{ margin: 0, fontWeight: 900 }}>{event.title}</h2>
						<div style={{ color: "var(--muted)", fontWeight: 700 }}>
							{event.venue} • {event.city} •{" "}
							{new Date(event.date).toLocaleString()}
						</div>
					</div>
					<div style={{ fontWeight: 900, fontSize: 20 }}>
						From ${event.minPrice}
					</div>
				</div>

				<div
					style={{
						marginTop: 16,
						display: "grid",
						gridTemplateColumns: "2fr 1fr",
						gap: 14,
					}}
				>
					<div style={{ display: "grid", gap: 10 }}>
						{listings.map((l) => (
							<ListingCard key={l._id} l={l} event={event} />
						))}
						{listings.length === 0 && (
							<div className="card" style={{ padding: 20 }}>
								No tickets listed yet.
							</div>
						)}
					</div>

					<div className="card" style={{ padding: 14, height: "fit-content" }}>
						<div style={{ fontWeight: 900, marginBottom: 8 }}>Seat Map</div>
						<div
							style={{
								height: 240,
								borderRadius: 12,
								background: "#f3f4f6",
								display: "grid",
								placeItems: "center",
								color: "var(--muted)",
							}}
						>
							Seat map placeholder
						</div>
					</div>
				</div>

				<div style={{ height: 60 }} />
			</div>
		</div>
	);
}
