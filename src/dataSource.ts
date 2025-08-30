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
        __dirname +'/src/entity/**/*.ts',
    ],
    subscribers: [],
    migrations: [
        __dirname + '/src/migration/**/*.ts',
    ],
    extra: {
        max:20,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 2000,
    }
});
export default AppDataSource;
