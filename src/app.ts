import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
dotenv.config();

const app = express();
//add cors
app.use(cors());
app.use(express.json());

// Ruta para la documentación de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// add router
app.use("/api", router);

app.get("/status", (request: Request, response: Response) => { 
  response.status(200).send("OK");
}); 



export default app;