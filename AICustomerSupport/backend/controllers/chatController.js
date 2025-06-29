
import Conversation from "../models/Conversation.js";
import { getGPTResponse } from "../utils/openaiClient.js";

// const Conversation = require('../models/Conversation');
// const { getGPTResponse } = require('../utils/openaiClient');

export const sendMessage = async (req, res) => {
  const { userId, message } = req.body;
  let convo = await Conversation.findOne({ userId });

  console.log(`User ID: ${userId}, Message: ${message}`);

  if (!convo) convo = new Conversation({ userId, messages: [] });

  convo.messages.push({ role: 'user', content: message });

  const reply = await getGPTResponse([
    { role: 'system', content: 'You are a helpful support agent.' },
    ...convo.messages,
  ]);

  convo.messages.push({ role: 'assistant', content: reply });
  await convo.save();

  res.json({ reply });
};

export const getHistory = async (req, res) => {
  const { userId } = req.params;
  const convo = await Conversation.findOne({ userId });
  res.json({ messages: convo?.messages || [] });
};
