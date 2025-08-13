// manage all routes
import { Router } from "express";
import { locationRouter } from "./location";
import { buildingRouter } from "./building";

const router = Router();

router.use("/location", locationRouter);
router.use("/building", buildingRouter);

export { router as indexRouter };
