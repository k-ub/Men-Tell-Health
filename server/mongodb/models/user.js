import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    allArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  });
  
  const userModel = mongoose.model("User", UserSchema);
  
  export default userModel;
  