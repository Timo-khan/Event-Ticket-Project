import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import logo from "../../assets/Fanzone.png"; // ✅ add your logo here
import "./navbar.css";

export default function Navbar() {
	const { user, logout } = useAuthStore();
	const nav = useNavigate();
	const location = useLocation();

	const isActive = (path: string) =>
		location.pathname === path || location.pathname.startsWith(path + "/");

	return (
		<div className="nav">
			<div className="nav-inner container">
				<Link to="/" className="logo">
					{/* Logo image */}
					<img
						src={logo}
						alt="Fanzone"
						className="logo-img"
						onError={(e) => {
							// fallback if image fails
							(e.currentTarget as HTMLImageElement).style.display = "none";
						}}
					/>

					{/* Text fallback / brand name */}
					{/* <div className="logo-text">Fanzone</div> */}
				</Link>

				<div className="nav-tabs">
					<Link
						to="/events"
						className={`tab ${isActive("/events") ? "active" : ""}`}
					>
						Buy
					</Link>
					<Link
						to="/sell"
						className={`tab ${isActive("/sell") ? "active" : ""}`}
					>
						Sell
					</Link>
					<Link
						to="/sell"
						className={`tab ${isActive("/sell") ? "active" : ""}`}
					>
						Create
					</Link>
				</div>

				<div className="nav-actions">
					{/* Admin-only button */}
					{user?.role === "admin" && (
						<button className="ghost" onClick={() => nav("/admin")}>
							Admin
						</button>
					)}

					{user ? (
						<>
							<button className="ghost" onClick={() => nav("/orders")}>
								My Orders
							</button>
							<button className="ghost" onClick={logout}>
								Log out
							</button>
						</>
					) : (
						<>
							<Link to="/signup" className="ghost">
								Sign Up
							</Link>
							<Link to="/login" className="pill">
								Log In
							</Link>
						</>
					)}

					<Link to="/cart" className="cart-pill">
						Cart
					</Link>
				</div>
			</div>
		</div>
	);
}
