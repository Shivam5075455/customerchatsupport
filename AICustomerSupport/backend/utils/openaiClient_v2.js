import dotenv from "dotenv";
dotenv.config();

const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_DEPLOYMENT, OPENAI_API_VERSION } = process.env;

import { AzureOpenAI } from "openai";

// console.log("Azure OpenAI client initialized with deployment:", AZURE_OPENAI_DEPLOYMENT, "and API version:", OPENAI_API_VERSION);

const client = new AzureOpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  endpoint: AZURE_OPENAI_ENDPOINT,
  deployment: AZURE_OPENAI_DEPLOYMENT,
  apiVersion: OPENAI_API_VERSION
})

export const getGPTResponse = async (messages) => {
  try {
    const response = await client.chat.completions.create({
      messages,
      model: AZURE_OPENAI_DEPLOYMENT,
      max_tokens: 100,
      temperature: 0.7
    });
    console.log('GPT Response:', response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    throw error;
  }
};