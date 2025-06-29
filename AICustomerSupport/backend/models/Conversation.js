// const mongoose = require('mongoose');
import {mongoose} from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
});

const conversationSchema = new mongoose.Schema({
  userId: String,
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Conversation", conversationSchema);