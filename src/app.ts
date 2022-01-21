import express from "express";
import logger from "morgan";
import { router } from "./routes";
import { corsConfig, rateLimitServer } from "./middlewares";

export const app = express();

app.use(rateLimitServer);

app.use(corsConfig);

app.use(express.json());

app.use(logger("dev"));

app.use("/", router);
