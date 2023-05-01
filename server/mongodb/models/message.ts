import { Schema, model } from 'mongoose';

export interface IMessage {
  groupId: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  //groupId: { type: Schema.Types.ObjectId, ref: 'ChatGroup', required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model<IMessage>('Message', messageSchema);
