import type { Request, Response } from "express";
import { Router } from "express";
import { pinoConfig } from "../logger/logger";
import { createSchedulingController } from "../UseCases/CreateScheduling";

export const router = Router();

router.post("/agendamento/:nome/:telefone/:npessoas/:preco/:datetime", async (req: Request, res: Response) => {
    pinoConfig.info("Route /agendamento executed");
    await createSchedulingController.handle(req, res);
});