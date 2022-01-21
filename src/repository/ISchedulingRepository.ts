import type { QueryResult } from "pg";
import type { Scheduling } from "../entities/scheduling";

export interface ISchedulingUserDelete {
    email: string;
    name: string;
}

export interface ISchedulingRepository {
    schedulingSave: (scheduleData: Scheduling) => Promise<void>;
    schedulingDelete: (PhoneNumber: number) => Promise<object>;
    schedulingAdminDelete: (email: string) => Promise<object>;
    findSchedulingByCellphone: (cellPhone: number) => Promise<QueryResult>;
}