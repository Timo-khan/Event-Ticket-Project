import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import EventCard from "../components/events/EventCard";

export default function Events() {
	const [events, setEvents] = useState<any[]>([]);
	const [params] = useSearchParams();
	const q = params.get("q") || "";

	useEffect(() => {
		api.get("/events", { params: { q } }).then((r) => setEvents(r.data));
	}, [q]);

	return (
		<div className="container" style={{ padding: "22px 0 60px" }}>
			<h2 style={{ margin: 0, fontWeight: 900 }}>Buy Tickets</h2>
			{q && (
				<div style={{ color: "var(--muted)", fontWeight: 700 }}>
					Results for “{q}”
				</div>
			)}

			<div
				style={{
					marginTop: 16,
					display: "grid",
					gridTemplateColumns: "repeat(3,1fr)",
					gap: 14,
				}}
			>
				{events.map((e) => (
					<EventCard key={e._id} e={e} />
				))}
			</div>
		</div>
	);
}
