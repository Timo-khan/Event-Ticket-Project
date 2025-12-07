import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="container" style={{ padding: 40 }}>
			<h2 style={{ fontWeight: 900 }}>Page not found</h2>
			<p style={{ color: "var(--muted)" }}>That route doesn’t exist.</p>
			<Link to="/" style={{ color: "var(--blue)", fontWeight: 800 }}>
				Go home
			</Link>
		</div>
	);
}
