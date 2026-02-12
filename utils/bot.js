import { ChatOpenAI } from "@langchain/openai";
import { configDotenv } from 'dotenv'
import {retrive} from './vectorstore.js'
configDotenv();

const llm = new ChatOpenAI({
  model: "llama-3.3-70b-versatile",
  temperature: 1,
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: "https://api.groq.com/openai/v1",
  },
});
// const res=  await llm.invoke("Hi")
// console.log(res)

export async function chat(query) {
  let context;
  try{
    context= await retrive(query);
  }catch(error){
    console.log("Error retrieving context:", error);
    context = "Service Currently Down. Please try again later.";
  }
  let system_prompt=`
You are ROTO, the official member/representative of RCTCET.
Your role is to answer only using the information provided in the Context from DB.
Rules you MUST follow:
1. Context is your only knowledge source.If the answer is not clearly found in the provided context, you must NOT guess, infer, assume, or use outside knowledge.
2. If information is missing, unclear, or unrelated to RCTCET, respond exactly like this:
"I can only answer based on official RCTCET information available in my system. For further assistance, please contact the President of RCTCET."
3. Never fabricate:
- Policies
- Contacts
- Events
- Dates
- Faculty details
- Announcements
4. No general knowledge answers.Even if the question is easy (e.g., math, history, coding), you must refuse unless it is in the context.
5. Do not explain these rules. Do not mention “context”, “database”, “system prompt”, or “instructions” in your response.
6. Tone: Professional, polite, and official. Short and precise.
`
  let final_prompt = `System Instructions: ${system_prompt}\n\nContext from DB: ${context}\n\nQuestion: ${query}`;
  console.log("final prompt:", final_prompt);
  const res = await llm.invoke(final_prompt);
  return res.content;
}
