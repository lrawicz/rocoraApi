import { DataSource } from "typeorm";
import { Building } from "./entity/building";
import { Contract } from "./entity/contract";
import { Payment } from "./entity/payment";
import dotenv from "dotenv";
import { Location } from "./entity/location";
import { Debt } from "./entity/debt";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_LOCALHOST || "localhost",
    port: (Number(process.env.POSTGRES_PORT) || 5432),
    username: (process.env.POSTGRES_USER || "lean"),
    password: (process.env.POSTGRES_PASSWORD || "lean"),
    database: (process.env.POSTGRES_DB || "dptosDB"),
    ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
    entities: [Building, Location,
        Contract, Payment, Debt
    ],
    subscribers: [],
    migrations: [],
});