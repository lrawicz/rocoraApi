import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRouter } from "./routes/index";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
dotenv.config();

const app = express();
//add cors
app.use(cors());
app.use(express.json());

// Ruta para la documentación de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// add index router
app.use("/api", indexRouter);
const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 



export default app;