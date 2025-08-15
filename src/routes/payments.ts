//routes for managing locations
import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

const paymentRouter = Router();

paymentRouter.get("/", PaymentController.getAll);
paymentRouter.get("/:id", PaymentController.getById);
paymentRouter.post("/", PaymentController.create);
paymentRouter.put("/:id", PaymentController.update);
paymentRouter.delete("/:id", PaymentController.delete);

export { paymentRouter };
