import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRouter } from "./routes/index";
dotenv.config();

const app = express();
//add cors
app.use(cors());
app.use(express.json());


// add index router
app.use("/api", indexRouter);
const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 



export default app;