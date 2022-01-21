import type { Request, Response } from "express";
import { pinoConfig } from "../../logger/logger";
import type { CreateSchedulingUseCase } from "./CreateSchedulingUseCase";

export class CreateSchedulingController {
    public constructor(
        private readonly createSchedulingUseCase: CreateSchedulingUseCase
    ) { }

    public async handle(req: Request, res: Response): Promise<Response> {
        pinoConfig.info("CreateSchedulingController handle executed");
        const { nome, telefone, npessoas, preco, datetime } = req.params;
        try {
            await this.createSchedulingUseCase.execute({
                userContact: Number(telefone),
                userCost: Number(preco),
                userDate: datetime,
                userName: nome,
                userPeaplesNumber: Number(npessoas),
            });
            pinoConfig.info("Scheduling succefull!");
            return res.send("Agendamento realizado com sucesso!");
        } catch (err) {
            const failRequestStatusCode = 500;
            return res.status(failRequestStatusCode).send(err.message);
        }
    }
}