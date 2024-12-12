import express from "express";
import { getAllCameras } from "../controllers/cameraController";

const router = express.Router();

router.get("/cameras", getAllCameras);

export default router;
