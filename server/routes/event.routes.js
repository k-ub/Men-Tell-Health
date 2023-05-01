import express from "express";

import {
  createEvent,
  getEvents
} from "../controllers/event.controller.js";

const router = express.Router();

router.route("/api/v1/events").post(createEvent);
router.route("/api/v1/events").get(getEvents);

export default router;
