import path from "path";
import fs from "fs";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { fileURLToPath } from "url";
import { embeddings } from "./embeddings.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadDocument(fileName) {
    const filePath = path.join(__dirname, "uploads", fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const ext = path.extname(fileName).toLowerCase();
    let loader;

    loader = new PDFLoader(filePath);
    const docs = await loader.load();
    console.log(`Loaded ${docs.length} documents from ${fileName}.`);
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 3500,
        chunkOverlap: 950,
    });
    fs.unlinkSync(filePath);
    const splitDocs = await splitter.splitDocuments(docs);
    console.log(`Split into ${splitDocs.length} chunks.`);
    const vectorStore = await QdrantVectorStore.fromDocuments(
        splitDocs, embeddings, {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        createCollectionIfNotExists: true,
        timeout: 30000,
        collectionName: "RC_KB"
    });
    return vectorStore;
}