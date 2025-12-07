import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

const suggested = [
	{ name: "Rod Wave", tag: "Trending" },
	{ name: "Zach Bryan", tag: "Trending" },
	{ name: "Gunna", tag: "Trending" },
	{ name: "Brandy", tag: "Trending" },
];

export default function SuggestedRow() {
	return (
		<div className="container suggested-wrap">
			<h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
				Suggested
			</h3>

			<div className="suggested-grid">
				{suggested.map((s) => (
					<Link
						to={`/events?q=${encodeURIComponent(s.name)}`}
						key={s.name}
						className="card suggested-card"
					>
						<div
							style={{
								width: 52,
								height: 52,
								borderRadius: 12,
								background: "#eef2f7",
								display: "grid",
								placeItems: "center",
								fontSize: 20,
							}}
						>
							🎟️
						</div>

						<div style={{ textAlign: "left" }}>
							<div style={{ fontWeight: 800 }}>{s.name}</div>
							<div style={{ marginTop: 4 }}>
								<Badge tone="gray">{s.tag}</Badge>
							</div>
						</div>

						<div
							style={{
								marginLeft: "auto",
								color: "var(--muted)",
								fontSize: 20,
							}}
						>
							›
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
