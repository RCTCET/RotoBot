import { Router } from "express";
import { chat } from "../utils/bot.js";
import { retrive } from "../utils/vectorstore.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contextPath = path.join(__dirname, "../utils/context.txt");

const chatRouter = Router();

chatRouter.get("/:query", async (req, res) => {
    const { query } = req.params;
    try {
        const ans = await chat(query);
        res.json({
            message: ans,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error processing request"
        });
    }
});
export default chatRouter;
