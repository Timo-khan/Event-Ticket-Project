import { useEffect, useState } from "react";
import { api } from "../api/client";

import HeroSearch from "../components/home/HeroSearch";
import SuggestedRow from "../components/home/SuggestedRow";
import AdvertVideo from "../components/home/AdvertVideo";

type ActiveAd = {
	_id: string;
	title?: string;
	srcUrl: string;
	active: boolean;
};

export default function Home() {
	const [activeAd, setActiveAd] = useState<ActiveAd | null>(null);

	useEffect(() => {
		api
			.get("/ads/active")
			.then((r) => setActiveAd(r.data))
			.catch(() => setActiveAd(null));
	}, []);

	return (
		<>
			<HeroSearch />
			<SuggestedRow />

			<div className="container home-tiles">
				{/* Left tile */}
				<div
					className="card home-tile"
					style={{
						padding: 26,
						background: "linear-gradient(135deg,#25a0ff,#11d2c5)",
						color: "white",
					}}
				>
					<div>
						<div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.05 }}>
							Best Price
							<br />
							Guarantee
						</div>
						<div style={{ marginTop: 8, fontWeight: 600, opacity: 0.95 }}>
							Built to find you the best deal. Fans know.
						</div>
					</div>

					<button
						style={{
							width: "fit-content",
							padding: "10px 18px",
							borderRadius: 999,
							border: "none",
							background: "white",
							color: "#0b0f19",
							fontWeight: 900,
							cursor: "pointer",
						}}
					>
						Learn More
					</button>
				</div>

				{/* Right tile: show latest admin ad if available */}
				<AdvertVideo
					defaultSrc={activeAd?.srcUrl || "/ads/tickpick-ad.mp4"}
					title={activeAd?.title || "Official Fan Experience Partners"}
					showUpload={false} // ✅ explicitly off
				/>
			</div>

			<div style={{ height: 80 }} />
		</>
	);
}
