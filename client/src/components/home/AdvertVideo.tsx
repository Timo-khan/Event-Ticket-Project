import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/auth.store";

export default function AdvertVideo({
	defaultSrc = "/ads/tickpick-ad.mp4",
	title = "Official Fan Experience Partners",
	showUpload = false, // ✅ NEW: default hidden everywhere
}: {
	defaultSrc?: string;
	title?: string;
	showUpload?: boolean;
}) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const { user } = useAuthStore();

	const [src, setSrc] = useState<string>(defaultSrc);
	const [fileName, setFileName] = useState<string>("");

	const isAdmin = user?.role === "admin";

	// ✅ IMPORTANT: whenever defaultSrc changes (Home fetch),
	// update internal src
	useEffect(() => {
		setSrc(defaultSrc);
		setFileName("");
	}, [defaultSrc]);

	// Detect YouTube
	const isYouTube =
		src.includes("youtube.com/watch?v=") || src.includes("youtu.be/");

	const getYouTubeEmbedUrl = (url: string) => {
		try {
			if (url.includes("watch?v=")) {
				const u = new URL(url);
				const id = u.searchParams.get("v");
				return id ? `https://www.youtube.com/embed/${id}` : url;
			}
			if (url.includes("youtu.be/")) {
				const id = url.split("youtu.be/")[1]?.split("?")[0];
				return id ? `https://www.youtube.com/embed/${id}` : url;
			}
			return url;
		} catch {
			return url;
		}
	};

	// Clean up object URLs
	useEffect(() => {
		return () => {
			if (src.startsWith("blob:")) URL.revokeObjectURL(src);
		};
	}, [src]);

	const onPickVideo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("video/")) {
			alert("Please select a video file.");
			return;
		}

		const url = URL.createObjectURL(file);
		setSrc(url);
		setFileName(file.name);

		setTimeout(() => videoRef.current?.play().catch(() => {}), 0);
	};

	return (
		<div className="card home-tile advert-tile">
			{/* YouTube → iframe, mp4/webm → video */}
			{isYouTube ? (
				<iframe
					src={getYouTubeEmbedUrl(src)}
					title="Advert video"
					style={{
						width: "100%",
						height: "100%",
						border: "none",
					}}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			) : (
				<video
					ref={videoRef}
					src={src}
					controls
					autoPlay
					muted
					loop
					playsInline
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			)}

			<div className="advert-overlay" />
			<div className="advert-title">{title}</div>

			{/* ✅ Upload ONLY if showUpload=true AND admin */}
			{showUpload && isAdmin && (
				<>
					<label className="advert-upload">
						<input
							type="file"
							accept="video/*"
							onChange={onPickVideo}
							style={{ display: "none" }}
						/>
						Upload video
					</label>

					{fileName && <div className="advert-filename">{fileName}</div>}
				</>
			)}
		</div>
	);
}
