import { Router } from "express";
import { getActiveAd } from "../controllers/admin.controller.js";

const r = Router();

r.get("/active", getActiveAd);

export default r;
