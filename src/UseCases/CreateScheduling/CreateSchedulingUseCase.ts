import { Scheduling } from "../../entities/scheduling";
import type { ISchedulingRepository } from "../../repository/ISchedulingRepository";
import type { ICreateSchedulingDTO } from "./CreateSchedulingDTO";

export class CreateSchedulingUseCase {
    public constructor(
        private readonly scheduleRepository: ISchedulingRepository,
    ) { }

    public async execute(data: ICreateSchedulingDTO): Promise<void> {
        const scheduleData = new Scheduling(data);
        await this.scheduleRepository.schedulingSave(scheduleData);
    }
}

