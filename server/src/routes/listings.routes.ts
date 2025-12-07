import { Router } from "express";
import { createListing, myListings } from "../controllers/listings.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.post("/", requireAuth, createListing);
r.get("/mine", requireAuth, myListings);
export default r;
