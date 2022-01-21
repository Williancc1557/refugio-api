import type { Scheduling } from "../entities/scheduling";

export interface ISchedulingUserDelete {
    email: string;
    name: string;
}

export interface ISchedulingRepository {
    schedulingSave: (scheduleData: Scheduling) => Promise<object>;
    schedulingDelete: (email: string) => Promise<object>;
    schedulingAdminDelete: (email: string) => Promise<object>;
    findSchedulingByCellphone: (email: string) => Promise<Scheduling>;
}