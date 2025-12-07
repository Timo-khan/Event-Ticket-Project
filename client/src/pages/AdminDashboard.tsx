import { useEffect, useState } from "react";
import { api } from "../api/client";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

type Tab = "ads" | "events" | "listings" | "users";

export default function AdminDashboard() {
	const [tab, setTab] = useState<Tab>("ads");

	return (
		<div className="container" style={{ padding: "22px 0 60px" }}>
			<h2 style={{ margin: 0, fontWeight: 900 }}>Admin Dashboard</h2>

			<div style={{ display: "flex", gap: 8, marginTop: 12 }}>
				{(["ads", "events", "listings", "users"] as Tab[]).map((t) => (
					<Button
						key={t}
						variant={tab === t ? "primary" : "secondary"}
						onClick={() => setTab(t)}
					>
						{t.toUpperCase()}
					</Button>
				))}
			</div>

			<div style={{ marginTop: 14 }}>
				{tab === "ads" && <AdsTab />}
				{tab === "events" && <EventsTab />}
				{tab === "listings" && <ListingsTab />}
				{tab === "users" && <UsersTab />}
			</div>
		</div>
	);
}

/* ---------------- ADS TAB ---------------- */

function AdsTab() {
	const [ads, setAds] = useState<any[]>([]);
	const [title, setTitle] = useState("");
	const [srcUrl, setSrcUrl] = useState("");
	const [notes, setNotes] = useState("");

	// ✅ local upload state
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);

	const load = () => api.get("/admin/ads").then((r) => setAds(r.data));
	useEffect(() => {
		load();
	}, []);

	// Save ad by URL
	const create = async () => {
		await api.post("/admin/ads", { title, srcUrl, notes });
		setTitle("");
		setSrcUrl("");
		setNotes("");
		load();
	};

	// Upload local MP4 to server
	const uploadLocalVideo = async () => {
		if (!file) return;

		setUploading(true);
		try {
			const form = new FormData();
			form.append("video", file);
			form.append("title", title || file.name);
			form.append("notes", notes);

			await api.post("/admin/ads/upload", form, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			// reset inputs
			setFile(null);
			setTitle("");
			setNotes("");
			setSrcUrl("");
			load();

			alert("Uploaded OK!");
		} catch (e: any) {
			alert(e?.response?.data?.message || "Upload failed");
		} finally {
			setUploading(false);
		}
	};

	const remove = async (id: string) => {
		await api.delete(`/admin/ads/${id}`);
		load();
	};

	// ✅ Preview helper: YouTube links render as iframe, mp4/webm as <video>
	const renderPreview = (url: string) => {
		const isYouTube =
			url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");

		if (isYouTube) {
			let videoId = "";

			try {
				if (url.includes("watch?v=")) {
					videoId = new URL(url).searchParams.get("v") || "";
				} else {
					videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
				}
			} catch {
				videoId = "";
			}

			const embedUrl = videoId
				? `https://www.youtube.com/embed/${videoId}`
				: url;

			return (
				<iframe
					src={embedUrl}
					title="YouTube ad preview"
					style={{
						width: "100%",
						height: 340,
						marginTop: 10,
						borderRadius: 12,
						border: "none",
						background: "#000",
					}}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			);
		}

		return (
			<video
				src={url}
				controls
				style={{
					width: "100%",
					marginTop: 10,
					borderRadius: 12,
					background: "#000",
				}}
			/>
		);
	};

	return (
		<div style={{ display: "grid", gap: 12 }}>
			<div className="card" style={{ padding: 14, display: "grid", gap: 10 }}>
				<div style={{ fontWeight: 900 }}>Add Ad Video (admin-only)</div>

				<Input
					label="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				{/* ✅ Local upload field */}
				<div style={{ display: "grid", gap: 6 }}>
					<label style={{ fontWeight: 800, fontSize: 13 }}>
						Upload from computer
					</label>
					<input
						type="file"
						accept="video/*"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
					/>
					{file && (
						<div style={{ fontSize: 12, color: "var(--muted)" }}>
							Selected: {file.name}
						</div>
					)}
					<Button
						onClick={uploadLocalVideo}
						disabled={!file || uploading}
					>
						{uploading ? "Uploading..." : "Upload Video File"}
					</Button>
				</div>

				<hr style={{ opacity: 0.2 }} />

				{/* ✅ URL upload still supported */}
				<Input
					label="Video URL"
					hint="Paste a direct mp4/webm URL or a YouTube link"
					value={srcUrl}
					onChange={(e) => setSrcUrl(e.target.value)}
				/>

				<Input
					label="Notes"
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
				/>

				<Button onClick={create} disabled={!title || !srcUrl}>
					Save Ad from URL
				</Button>
			</div>

			<div style={{ display: "grid", gap: 10 }}>
				{ads.map((a) => (
					<div key={a._id} className="card" style={{ padding: 14 }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<div style={{ fontWeight: 900 }}>{a.title}</div>
								<div style={{ color: "var(--muted)", fontSize: 13 }}>
									{a.srcUrl}
								</div>
							</div>
							<Button variant="danger" onClick={() => remove(a._id)}>
								Delete
							</Button>
						</div>

						{renderPreview(a.srcUrl)}
					</div>
				))}

				{ads.length === 0 && (
					<div className="card" style={{ padding: 16 }}>
						No ads yet.
					</div>
				)}
			</div>
		</div>
	);
}

/* ---------------- EVENTS TAB ---------------- */

function EventsTab() {
	const [events, setEvents] = useState<any[]>([]);
	const load = () => api.get("/admin/events").then((r) => setEvents(r.data));
	useEffect(() => {
		load();
	}, []);

	const del = async (id: string) => {
		await api.delete(`/admin/events/${id}`);
		load();
	};

	return (
		<div style={{ display: "grid", gap: 8 }}>
			{events.map((e) => (
				<div
					key={e._id}
					className="card"
					style={{
						padding: 12,
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<div>
						<div style={{ fontWeight: 900 }}>{e.title}</div>
						<div style={{ color: "var(--muted)", fontSize: 13 }}>
							{e.venue} • {new Date(e.date).toLocaleString()}
						</div>
					</div>
					<Button variant="danger" onClick={() => del(e._id)}>
						Delete
					</Button>
				</div>
			))}
		</div>
	);
}

/* ---------------- LISTINGS TAB ---------------- */

function ListingsTab() {
	const [listings, setListings] = useState<any[]>([]);
	const load = () =>
		api.get("/admin/listings").then((r) => setListings(r.data));
	useEffect(() => {
		load();
	}, []);

	const remove = async (id: string) => {
		await api.patch(`/admin/listings/${id}/remove`, {});
		load();
	};

	return (
		<div style={{ display: "grid", gap: 8 }}>
			{listings.map((l) => (
				<div key={l._id} className="card" style={{ padding: 12 }}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<div style={{ fontWeight: 900 }}>
								{l.eventId?.title} — {l.section} Row {l.row}
							</div>
							<div style={{ color: "var(--muted)", fontSize: 13 }}>
								Seller: {l.sellerId?.email} • ${l.priceEach} • qty {l.quantity}{" "}
								• {l.status}
							</div>
						</div>
						{l.status === "active" && (
							<Button variant="danger" onClick={() => remove(l._id)}>
								Remove
							</Button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

/* ---------------- USERS TAB ---------------- */

function UsersTab() {
	const [users, setUsers] = useState<any[]>([]);
	useEffect(() => {
		api.get("/admin/users").then((r) => setUsers(r.data));
	}, []);

	return (
		<div style={{ display: "grid", gap: 8 }}>
			{users.map((u) => (
				<div key={u._id} className="card" style={{ padding: 12 }}>
					<div style={{ fontWeight: 900 }}>
						{u.name} ({u.role})
					</div>
					<div style={{ color: "var(--muted)", fontSize: 13 }}>{u.email}</div>
				</div>
			))}
		</div>
	);
}
