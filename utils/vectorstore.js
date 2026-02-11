import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";
import { embeddings } from "./embeddings.js";

export const vectorStore = await QdrantVectorStore.fromExistingCollection(
  embeddings,
  {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: "RC_KB",
  }
);

export async function retrive(text) {
  console.log("retrieving context for:", text);
  const results = await vectorStore.similaritySearch(text, 4);
  return results.map(res => res.pageContent).join("\n\n");
}