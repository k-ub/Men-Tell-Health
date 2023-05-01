// api.ts
import axios from 'axios';

interface CreateGroupChatPayload {
  name: string;
}

export const createGroupChat = async (payload: CreateGroupChatPayload) => {
  // Replace the URL with the actual endpoint for creating a group chat
  const url = 'http://localhost:3000/api/group-chats';
  const response = await axios.post(url, payload);

  return response.data;
};
