//routes for managing contracts
import { Router } from "express";
import { checkJwt } from "../middleware/checkJwt";
import RepairController from "../controllers/repairController";

const contractRouter = Router();

contractRouter.get("/", RepairController.getAll);
contractRouter.get("/getByLocationId/:id", RepairController.getByLocationId);
contractRouter.get("/:id", RepairController.getById);
contractRouter.post("/", checkJwt, RepairController.create);
contractRouter.put("/:id", checkJwt, RepairController.update);
contractRouter.delete("/:id", checkJwt, RepairController.delete);


export { contractRouter };
