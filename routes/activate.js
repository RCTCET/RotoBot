import { Router } from "express";
import { chat } from "../utils/bot.js";
import { retrive } from "../utils/vectorstore.js";

const activateRouter = Router();

activateRouter.get('/',
    async (req,res)=>{
        // console.log("started");
        res.send("Hi Bot backend here")
    }
)
activateRouter.get('/qdrant',
    async (req,res)=>{
        // console.log("started");
        const resawait = await retrive("Aaditya");
        res.send("Qdrant Alive?"+ resawait)
    }
)

export default activateRouter;
