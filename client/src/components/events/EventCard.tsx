import { Link } from "react-router-dom";

export default function EventCard({ e }: { e: any }) {
	const date = new Date(e.date).toLocaleString();
	return (
		<Link
			to={`/events/${e._id}`}
			className="card"
			style={{ overflow: "hidden" }}
		>
			<div
				style={{
					height: 160,
					backgroundImage: `url(${
						e.heroImage ||
						"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600"
					})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<div style={{ padding: 14 }}>
				<div style={{ fontWeight: 900, fontSize: 16 }}>{e.title}</div>
				<div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
					{e.venue} • {e.city}
				</div>
				<div style={{ fontSize: 13, marginTop: 6 }}>{date}</div>
				<div style={{ marginTop: 8, fontWeight: 800 }}>From ${e.minPrice}</div>
			</div>
		</Link>
	);
}
