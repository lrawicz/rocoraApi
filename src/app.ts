import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import AppDataSource from "./dataSource";
import settings from "./config/settings";

const app = express();
//add cors
app.use(cors({
  origin: settings.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
}));

//add json parser
app.use(express.json());

// Ruta para la documentación de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// add router
app.use("/api", router);

app.get("/status", (request: Request, response: Response) => { 
  AppDataSource.query('SELECT 1').then(() => {
    response.status(200).json({status:"healthy", db:"connected"});
  })
  .catch(() => {
    response.status(500).json({status:"unhealthy", db:"disconnected"});
  });
}); 



export default app;