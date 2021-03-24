import { Router } from "express";
import { appointmentsRouter } from "./appointments.routes";

const router = Router();
router.use("/appointments", appointmentsRouter);

router.get("/", () => {
  console.log("ajdsiajda");
});

export default router;
