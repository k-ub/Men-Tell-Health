// mongodb/models/message.js
import mongoose from "mongoose";

export const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  groupChat: { type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" },
  createdAt: { type: Date, default: Date.now },
});

const messageModel = mongoose.model("Message", MessageSchema);

export default messageModel;