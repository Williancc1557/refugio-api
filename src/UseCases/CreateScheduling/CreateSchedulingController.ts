import type { Request, Response } from "express";
import type { CreateSchedulingUseCase } from "./CreateSchedulingUseCase";

export class CreateSchedulingController {
    public constructor(
        private readonly createSchedulingUseCase: CreateSchedulingUseCase
    ) { }

    public async handle(req: Request, res: Response): Promise<Response> {
        const { nome, telefone, npessoas, preco, dataReplaced } = req.body;
        try {
            await this.createSchedulingUseCase.execute({
                userContact: telefone,
                userCost: preco,
                userDate: dataReplaced,
                userName: nome,
                userPeaplesNumber: npessoas,
            });

            return res.send("Agendamento realizado com sucesso!");
        } catch (err) {
            const failRequestStatusCode = 500;
            return res.status(failRequestStatusCode).send(err.message);
        }
    }
}