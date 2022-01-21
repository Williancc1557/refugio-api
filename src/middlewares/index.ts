import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { app } from "../app";

const minutesRateLimit = 15;
const secondsRateLimit = 60;
const milisecondsRateLimit = 1000;

export const rateLimitServer = rateLimit({
    windowMs: minutesRateLimit * secondsRateLimit * milisecondsRateLimit,
    max: 100,
    message: "Muitas requisições foram solicitadas, por favor, aguarde 15 minutos",
});

export const corsConfig = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
};