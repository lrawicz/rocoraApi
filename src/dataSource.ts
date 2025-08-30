import { DataSource } from "typeorm";
import dotenv from "dotenv";
import settings from "./config/settings";
dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: settings.DB.HOST,
    port: settings.DB.PORT,
    username: settings.DB.USER,
    password: settings.DB.PASSWORD,
    database: settings.DB.DB_NAME,
    ssl: settings.DB.SSL,
    synchronize: false,
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
