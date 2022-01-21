import { Scheduling } from "../../entities/scheduling";
import { pinoConfig } from "../../logger/logger";
import type { ISchedulingRepository } from "../../repository/ISchedulingRepository";
import type { ICreateSchedulingDTO } from "./CreateSchedulingDTO";

export class CreateSchedulingUseCase {
    public constructor(
        private readonly scheduleRepository: ISchedulingRepository,
    ) { }

    public async execute(data: ICreateSchedulingDTO): Promise<void> {
        pinoConfig.info("CreateSchedulingUseCase execute method executed");
        const scheduleData = new Scheduling(data);
        await this.scheduleRepository.schedulingSave(scheduleData);
    }
}

