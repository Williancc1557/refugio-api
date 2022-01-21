import { PostgresRepository } from "../../repository/implements/postgresRepository";
import dotenv from "dotenv";
import { CreateSchedulingUseCase } from "./CreateSchedulingUseCase";
import { CreateSchedulingController } from "./CreateSchedulingController";
dotenv.config();

const postgresRepository = new PostgresRepository(process.env.DATABASE_URL);
const createSchedulingUseCase = new CreateSchedulingUseCase(postgresRepository);

export const createSchedulingController = new CreateSchedulingController(createSchedulingUseCase);