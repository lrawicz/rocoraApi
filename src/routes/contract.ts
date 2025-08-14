//routes for managing contracts
import { Router } from "express";
import ContractController from "../controllers/contractController";

const contractRouter = Router();

contractRouter.get("/", ContractController.getAll);
contractRouter.get("/getByLocationId/:id", ContractController.getByLocationId);
contractRouter.get("/:id", ContractController.getById);
contractRouter.post("/", ContractController.create);
contractRouter.put("/:id", ContractController.update);
contractRouter.delete("/:id", ContractController.delete);
contractRouter.get("/getTotalDebt/:id", ContractController.getTotalDebt);

export { contractRouter };
