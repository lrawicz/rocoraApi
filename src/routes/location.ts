//routes for managing locations
import { Router } from "express";
import { LocationController } from "../controllers/locationController";

const locationRouter = Router();

locationRouter.get("/", LocationController.getAllLocations);
locationRouter.get("/:name", LocationController.getLocationByName);
locationRouter.post("/", LocationController.createLocation);
locationRouter.put("/:name", LocationController.updateLocation);
locationRouter.delete("/:name", LocationController.deleteLocation);

export { locationRouter };
