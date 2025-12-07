import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Sell from "./pages/Sell";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/AdminDashboard";
import RequireAdmin from "./components/layout/RequireAdmin";

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/events", element: <Events /> },
			{ path: "/events/:id", element: <EventDetail /> },
			{ path: "/sell", element: <Sell /> },
			{ path: "/cart", element: <Cart /> },
			{ path: "/checkout", element: <Checkout /> },
			{ path: "/orders", element: <Orders /> },
			{ path: "/login", element: <Login /> },
			{ path: "/signup", element: <Signup /> },

			// ✅ Admin-only dashboard
			{
				path: "/admin",
				element: (
					<RequireAdmin>
						<AdminDashboard />
					</RequireAdmin>
				),
			},

			{ path: "*", element: <NotFound /> },
		],
	},
]);
