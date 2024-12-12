import express from "express";
import { getAllGroups } from "../controllers/cameraGroupController";

const router = express.Router();

router.get("/groups", getAllGroups);

export default router;
