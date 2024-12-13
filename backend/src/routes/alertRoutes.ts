import express from "express";
import { alertDistribution } from "../controllers/alertController";

const router = express.Router();

router.post("/alerts/distribution", alertDistribution);

export default router;
