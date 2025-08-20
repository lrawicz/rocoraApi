// manage all routes
import { Router } from "express";
import { locationRouter } from "./routes/location";
import { buildingRouter } from "./routes/building";
import { contractRouter } from "./routes/contract";
import { paymentRouter } from "./routes/payments";
import authRouter from "./routes/auth";

const router = Router();

router.use("/location", locationRouter);
router.use("/building", buildingRouter);
router.use("/contract", contractRouter);
router.use("/payment", paymentRouter);
router.use("/auth", authRouter);

export { router };
