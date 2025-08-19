import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_LOCALHOST || "localhost",
    port: (Number(process.env.POSTGRES_PORT) || 5432),
    username: (process.env.POSTGRES_USER || "lean"),
    password: (process.env.POSTGRES_PASSWORD || "lean"),
    database: (process.env.POSTGRES_DB || "dptosDB"),
    ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
    entities: [
        'src/entity/**/*.ts',
    ],
    subscribers: [],
    migrations: [
        'src/migration/**/*.ts',
    ],
});
export default AppDataSource;
