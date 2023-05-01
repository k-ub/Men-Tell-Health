// controllers/groupChat.controller.js
import GroupChat from "../mongodb/models/groupChat.js";
import Message from "../mongodb/models/message.js";
import User from "../mongodb/models/user.js";

// ... other imports and configurations

const createGroupChat = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    const newGroupChat = new GroupChat({
      name,
      description,
      users: [userId],
    });

    await newGroupChat.save();

    res.status(201).json(newGroupChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinGroupChat = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const groupChat = await GroupChat.findById(groupId);
    const user = await User.findById(userId);

    if (!groupChat || !user) {
      return res.status(404).json({ message: "Group chat or user not found" });
    }

    if (!groupChat.users.includes(userId)) {
      groupChat.users.push(userId);
      await groupChat.save();
    }

    res.status(200).json(groupChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { content, userId, groupId } = req.body;

    const groupChat = await GroupChat.findById(groupId);
    const user = await User.findById(userId);

    if (!groupChat || !user) {
      return res.status(404).json({ message: "Group chat or user not found" });
    }

    const newMessage = new Message({
      content,
      user: userId,
      groupChat: groupId,
    });

    await newMessage.save();

    groupChat.messages.push(newMessage);
    await groupChat.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... other functions

export { createGroupChat, joinGroupChat, sendMessage };
