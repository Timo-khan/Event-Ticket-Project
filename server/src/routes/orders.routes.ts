import { Router } from "express";
import { checkout, myOrders } from "../controllers/orders.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.post("/checkout", requireAuth, checkout);
r.get("/mine", requireAuth, myOrders);
export default r;
