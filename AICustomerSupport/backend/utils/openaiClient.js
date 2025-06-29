// const axios = require('axios');
const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_DEPLOYMENT, API_VERSION } = process.env;

// exports.getGPTResponse = async (messages) => {
//   const url = `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2023-03-15-preview`;
//   const res = await axios.post(
//     url,
//     { messages, temperature: 0.7 },
//     { headers: { 'api-key': AZURE_OPENAI_API_KEY } }
//   );
//   return res.data.choices[0].message.content;
// };


import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Pick your authentication method:
// const credential = new DefaultAzureCredential();
// const bearer = getBearerTokenProvider(credential, "https://cognitiveservices.azure.com/.default");

// console.log("Azure OpenAI client initialized with deployment:", AZURE_OPENAI_DEPLOYMENT, "and API version:", process.env.API_VERSION);

// const client = new AzureOpenAI({
  
//   azureADTokenProvider: bearer,
//   endpoint: 'https://sk5075455-8870-resource.services.ai.azure.com/api/projects/sk5075455-8870',
//   deployment: 'gpt-4.1',
//   apiVersion: '2025-04-14'
// });


const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
(async () => {
  const { AzureKeyCredential } = await import("@azure/openai");

const apiKey = new AzureKeyCredential(AZURE_OPENAI_API_KEY);
const endpoint = AZURE_OPENAI_ENDPOINT;
const apiVersion = API_VERSION;
const deployment = AZURE_OPENAI_DEPLOYMENT;

// const client = new AzureOpenAI({ 
//     apiKey, 
//     endpoint, 
//     apiVersion, 
//     deployment 
// });

// const client = new OpenAIClient(endpoint, apiKey);

// const result = await client.chat.completions.create({ messages, model: '', max_tokens: 100 });

const getGPTResponse = async (messages) => {
  try {
    const response = await client.chat.completions.create({
      messages,
      model: 'gpt-4.1',
      max_tokens: 100,
      temperature: 0.7
    });
    console.log('GPT Response:', response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    throw error;
  }
}

})

// Export the function outside the IIFE
export { getGPTResponse };
