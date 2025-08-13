// manage all routes
import { Router } from "express";
import { locationRouter } from "./routes/location";
import { buildingRouter } from "./routes/building";
import { contractRouter } from "./routes/contract";

const router = Router();

router.use("/location", locationRouter);
router.use("/building", buildingRouter);
router.use("/contract", contractRouter);

export { router };
