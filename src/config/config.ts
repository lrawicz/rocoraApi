import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT : process.env.PORT || 3000,
    API_KEY: process.env.API_KEY || "esta-es-una-clave-muy-secreta-y-dificil-de-adivinar",
    JWT_SECRET: process.env.JWT_SECRET || "supersecretjwtkey",
    SALT: process.env.SALT || "supersecretSaltkey",
}

export default config;