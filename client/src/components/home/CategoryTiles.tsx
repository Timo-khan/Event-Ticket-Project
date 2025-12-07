import { Link } from "react-router-dom";

const cats = [
	{ key: "sports", label: "Sports", icon: "🏈" },
	{ key: "concert", label: "Concerts", icon: "🎵" },
	{ key: "theater", label: "Theater", icon: "🎭" },
	{ key: "comedy", label: "Comedy", icon: "😂" },
];

export default function CategoryTiles() {
	return (
		<div className="container" style={{ marginTop: 18 }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gap: 12,
				}}
			>
				{cats.map((c) => (
					<Link
						key={c.key}
						to={`/events?category=${c.key}`}
						className="card"
						style={{
							padding: 16,
							display: "flex",
							alignItems: "center",
							gap: 10,
							fontWeight: 900,
						}}
					>
						<div style={{ fontSize: 22 }}>{c.icon}</div>
						{c.label}
					</Link>
				))}
			</div>
		</div>
	);
}
