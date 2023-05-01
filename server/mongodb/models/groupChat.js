// mongodb/models/groupChat.js
import mongoose from "mongoose";

const GroupChatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const groupChatModel = mongoose.model("GroupChat", GroupChatSchema);

export default groupChatModel;

