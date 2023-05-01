import Event from "../mongodb/models/event.js";
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, email } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
    });

    user.events.push(newEvent._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json({ events });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export default createEvent;
