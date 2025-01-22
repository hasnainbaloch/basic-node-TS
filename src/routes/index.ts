import { Router } from "express";
import userRoutes from "./user.routes";
import invoiceRoutes from "./invoice.routes";

const router = Router();

router.use("/", userRoutes);
router.use("/", invoiceRoutes);

export const routes = router;
