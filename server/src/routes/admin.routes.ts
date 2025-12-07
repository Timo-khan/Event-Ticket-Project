import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { uploadAdVideo } from "../middleware/uploadAdVideo.js";
import { uploadAd } from "../controllers/admin.controller.js";

import {
  listAds, createAd, deleteAd,
  adminListEvents, adminDeleteEvent,
  adminListListings, adminRemoveListing,
  adminListUsers
} from "../controllers/admin.controller.js";

const r = Router();

// all admin routes protected
r.use(requireAuth, requireAdmin);

// ads
r.get("/ads", listAds);
r.post("/ads", createAd);
r.delete("/ads/:id", deleteAd);

// events
r.get("/events", adminListEvents);
r.delete("/events/:id", adminDeleteEvent);

// listings
r.get("/listings", adminListListings);
r.patch("/listings/:id/remove", adminRemoveListing);

// users
r.get("/users", adminListUsers);

r.post("/ads/upload", uploadAdVideo.single("video"), uploadAd);


export default r;
