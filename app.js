import express from 'express';
import cors from 'cors';
import activateRouter from './routes/activate.js';
import chatRouter from './routes/chatRouter.js'
import uploadRouter from './routes/uploader.js';
import { dailyRateLimiter } from './middleware/rateLimter.js';

const app = express();
app.set('trust proxy', 1);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());


app.use('/chat',dailyRateLimiter, chatRouter);
app.use('/activate', activateRouter);
app.use('/upload', uploadRouter);

export default app;