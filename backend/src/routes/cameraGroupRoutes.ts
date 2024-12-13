import express from "express";
import {
  getAllGroups,
  createGroup,
  getGroupByCameraIds,
  deleteGroup,
} from "../controllers/cameraGroupController";

const router = express.Router();

router.get("/groups", getAllGroups);
router.post("/groups", createGroup);
router.delete("/groups/:groupId", deleteGroup);
router.post("/group", getGroupByCameraIds);

export default router;
