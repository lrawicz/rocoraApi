//routes for managing locations
import { Router } from "express";
import { LocationController } from "../controllers/locationController";

const locationRouter = Router();

locationRouter.get("/", LocationController.getAll);
locationRouter.get("/getByName/:name", LocationController.getByName);
locationRouter.get("/:id", LocationController.getById);
locationRouter.post("/", LocationController.create);
locationRouter.put("/:id", LocationController.update);
locationRouter.delete("/:id", LocationController.delete);

export { locationRouter };
