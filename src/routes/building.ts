//routes for managing buildings
import { Router } from "express";
import { BuildingController } from "../controllers/buildingController";
import { apiKeyAuth } from "../middleware/auth";

const buildingRouter = Router();

buildingRouter.get("/", BuildingController.getAllBuildings);
buildingRouter.get("/:id", BuildingController.getBuildingById);
buildingRouter.post("/", apiKeyAuth, BuildingController.createBuilding);
buildingRouter.put("/:id", apiKeyAuth, BuildingController.updateBuilding);
buildingRouter.delete("/:id", apiKeyAuth, BuildingController.deleteBuilding);

export { buildingRouter };
