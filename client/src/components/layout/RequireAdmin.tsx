import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function RequireAdmin({ children }: { children: JSX.Element }) {
	const user = useAuthStore((s) => s.user);

	if (!user) return <Navigate to="/login" replace />;
	if (user.role !== "admin") return <Navigate to="/" replace />;

	return children;
}
