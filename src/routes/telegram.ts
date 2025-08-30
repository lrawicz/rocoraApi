//routes for managing buildings
import { Router } from "express";
import { apiKeyAuth } from "../middleware/auth.js";
import PaymentController from "../controllers/paymentController.js";

const telegramRouter = Router();

telegramRouter.post("/payment", apiKeyAuth, PaymentController.createUsingLocationName);
telegramRouter.post("/arreglos", apiKeyAuth, PaymentController.createUsingLocationName);
telegramRouter.post("/serviciosGenerales", apiKeyAuth, PaymentController.createUsingLocationName);


export { telegramRouter};
