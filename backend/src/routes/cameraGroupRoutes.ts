import express, { Request, Response } from "express";
import {
  createGroup,
  getAllGroups,
  // addCameraToGroup,
  // removeCameraFromGroup,
  // getCamerasInGroup,
  // deleteGroup,
} from "../controllers/cameraGroupController";

const router = express.Router();

router.post("/groups", async (req: Request, res: Response) =>
  createGroup(req, res)
);
router.get("/groups", async (req: Request, res: Response) =>
  getAllGroups(req, res)
);
// router.post("/groups/add-camera", async (req: Request, res: Response) =>
//   addCameraToGroup(req, res)
// );
// router.post("/groups/remove-camera", async (req: Request, res: Response) =>
//   removeCameraFromGroup(req, res)
// );
// router.get("/groups/:groupId/cameras", async (req: Request, res: Response) =>
//   getCamerasInGroup(req, res)
// );
// router.delete("/groups/:groupId", async (req: Request, res: Response) =>
//   deleteGroup(req, res)
// );
export default router;
