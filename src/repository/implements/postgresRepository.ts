import type { QueryResult } from "pg";
import { Pool } from "pg";
import type { Scheduling } from "../../entities/scheduling";
import { pinoConfig } from "../../logger/logger";
import type { ISchedulingRepository } from "../ISchedulingRepository";
import { isBrazilianPhone, isDateMDY } from "@techmmunity/utils";

export class PostgresRepository implements ISchedulingRepository {
    public constructor(
        private readonly databaseUrlStringConnect: string,
        private readonly connectDatabase: Pool = new Pool({
            connectionString: databaseUrlStringConnect,
            ssl: {
                rejectUnauthorized: false,
            },
        })
    ) { }


    public findSchedulingByCellphone(cellPhone: number): Promise<QueryResult> {
        const queryFindScheduling = this.connectDatabase.query("select * from agendamento WHERE telefone = $1", [cellPhone]);
        pinoConfig.info("findSchedulingByCellphone executed");
        return queryFindScheduling;
    }

    public async schedulingSave(scheduleData: Scheduling): Promise<void> {
        const isChedulingAlreadyExists = await this.findSchedulingByCellphone(scheduleData.userContact);

        const notAlreadyExistsCheduling = 0;
        if (isChedulingAlreadyExists.rowCount != notAlreadyExistsCheduling) throw new Error("Já possui um agendamento vinculado a esse número!");

        const datePosition = 0;
        scheduleData.userDate = scheduleData.userDate.replace("+", " ");
        const onlyDate = scheduleData.userDate.split(" ")[datePosition];

        if (!isDateMDY(onlyDate)) throw new Error("Data inválida!");
        if (!isBrazilianPhone(String(scheduleData.userContact))) throw new Error("Numero inválido!");

        const dataQuery = [scheduleData.userName, scheduleData.userContact, scheduleData.userPeaplesNumber, scheduleData.userCost, scheduleData.userDate];

        try {
            await this.connectDatabase.query("INSERT INTO agendamento(nome, telefone, npessoas, preco, data) VALUES($1, $2, $3, $4, $5)", dataQuery);
            pinoConfig.info("INSERT INTO query in file Repository executed");
        } catch (err) {
            if (err.constraint == "agendamento_pkey") throw new Error("Não foi possivel realizar o agendamento, tente em outro horário");
        }
    }

    public schedulingAdminDelete: (email: string) => Promise<object>;

    public schedulingDelete: (PhoneNumber: number) => Promise<object>;
}