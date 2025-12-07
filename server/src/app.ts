import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import listingsRoutes from "./routes/listings.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import adminRoutes from "./routes/admin.routes.js";
import adsRoutes from "./routes/ads.routes.js";
import path from "path";




const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// serve uploaded ad videos
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ads", adsRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;
