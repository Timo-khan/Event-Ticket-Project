import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SidebarIcons from "./components/layout/SidebarIcons";
import Footer from "./components/layout/Footer";

export default function App() {
	return (
		<div>
			<Navbar />
			<SidebarIcons />
			<Outlet />
			<Footer />
		</div>
	);
}
