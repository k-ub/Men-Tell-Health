import { Schema, model } from 'mongoose';

export interface IChatGroup {
  name: string;
  description: string;
  members: string[];
}

const chatGroupSchema = new Schema<IChatGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: [String], default: [] },
});

export default model<IChatGroup>('ChatGroup', chatGroupSchema);
