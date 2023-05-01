// routes/groupChat.routes.js
import express from "express";
import {
  createGroupChat,
  joinGroupChat,
  sendMessage,
} from "../controllers/groupChat.controller.js";

const router = express.Router();

router.route("/").post(createGroupChat);
router.route("/join").post(joinGroupChat);
router.route("/message").post(sendMessage);

export default router;
