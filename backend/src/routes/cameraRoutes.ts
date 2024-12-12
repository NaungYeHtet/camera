import express from "express";
import {
  getAllCameras,
  updateCameraStatus,
} from "../controllers/cameraController";

const router = express.Router();

router.get("/cameras", getAllCameras);
router.put("/cameras/:id/status", updateCameraStatus);

export default router;
