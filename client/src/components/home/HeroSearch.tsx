import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeroSearch() {
	const [q, setQ] = useState("");
	const nav = useNavigate();

	return (
		<section className="home-hero">
			<div className="container">
				<h1>Fans Know</h1>
				<p>The best memories start with the best prices.</p>

				<form
					className="hero-search"
					onSubmit={(e) => {
						e.preventDefault();
						nav(`/events?q=${encodeURIComponent(q)}`);
					}}
				>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Search by artist, team, event or venue"
					/>
					<button aria-label="search">🔍</button>
				</form>
			</div>
		</section>
	);
}
