import { Router } from "express";
import { listEvents, getEvent } from "../controllers/events.controller.js";

const r = Router();
r.get("/", listEvents);
r.get("/:id", getEvent);
export default r;
