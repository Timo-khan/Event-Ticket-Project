import { useState } from "react";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth.store";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
	const setAuth = useAuthStore((s) => s.setAuth);
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submit = async (e: any) => {
		e.preventDefault();
		const r = await api.post("/auth/login", { email, password });
		setAuth(r.data.token, r.data.user);
		nav("/");
	};

	return (
		<div className="container" style={{ padding: "50px 0", maxWidth: 420 }}>
			<h2 style={{ fontWeight: 900 }}>Log In</h2>
			<form
				onSubmit={submit}
				className="card"
				style={{ padding: 16, display: "grid", gap: 10 }}
			>
				<input
					placeholder="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{
						padding: 10,
						borderRadius: 8,
						border: "1px solid var(--border)",
					}}
				/>
				<input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{
						padding: 10,
						borderRadius: 8,
						border: "1px solid var(--border)",
					}}
				/>
				<button
					style={{
						padding: "12px 14px",
						borderRadius: 10,
						border: "none",
						background: "var(--blue)",
						color: "white",
						fontWeight: 800,
					}}
				>
					Log in
				</button>
			</form>
			<p style={{ marginTop: 12 }}>
				No account?{" "}
				<Link to="/signup" style={{ color: "var(--blue)", fontWeight: 800 }}>
					Sign up
				</Link>
			</p>
		</div>
	);
}
