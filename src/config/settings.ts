import * as dotenv from "dotenv";
dotenv.config();

const settings = {
    PORT : process.env.PORT || 3000,
    API_KEY: process.env.API_KEY || "esta-es-una-clave-muy-secreta-y-dificil-de-adivinar",
    JWT_SECRET: process.env.JWT_SECRET || "supersecretjwtkey",
    SALT: process.env.SALT || "supersecretSaltkey",
    DB:{
        USER: process.env.POSTGRES_USER || "lean",
        PASSWORD: process.env.POSTGRES_PASSWORD || "lean",
        DB_NAME: process.env.POSTGRES_DB || "dptosDB",
        HOST: process.env.POSTGRES_HOST || "localhost",
        PORT: Number(process.env.POSTGRES_PORT) || 5432,
        SSL: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
    },
    CORS_ORIGIN: process.env.CORS_ORIGIN?.split(",").map(item=>item.trim()) || "*" 
}

export default settings;