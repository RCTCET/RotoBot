import { Router } from "express";
import { chat } from "../utils/bot.js";

const activateRouter = Router();

activateRouter.get('/',
    async (req,res)=>{
        // console.log("started");
        fetch('https://f594cffa-e112-4e71-8b9e-b3bea28f3539.europe-west3-0.gcp.cloud.qdrant.io')
        res.send("Hi Bot backend here")
    }
)

export default activateRouter;
