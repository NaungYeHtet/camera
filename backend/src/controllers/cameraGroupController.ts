// src/controllers/cameraGroupController.ts
import { Request, Response } from "express";
import { Camera } from "../models/Camera";
import { CameraGroup } from "../models/CameraGroup3";

// Create a Camera Group
export const createGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const group = await CameraGroup.create({ name, description });
    res.status(201).json(group);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to create group", details: error.message });
  }
};

// Get All Camera Groups
export const getAllGroups = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const groups = await CameraGroup.findAll();
    res.status(200).json(groups);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch groups", details: error.message });
  }
};

// Add Camera to Group
// export const addCameraToGroup = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { cameraId, groupId } = req.body;

//     const camera = await Camera.findByPk(cameraId);
//     const group = await CameraGroup.findByPk(groupId);

//     if (!camera || !group) {
//       res.status(404).json({ error: "Camera or Group not found" });
//       return;
//     }

//     await group.addCamera(camera);
//     res.status(200).json({ message: "Camera added to group successfully" });
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ error: "Failed to add camera to group", details: error.message });
//   }
// };

// // Remove Camera from Group
// export const removeCameraFromGroup = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { cameraId, groupId } = req.body;

//     const camera = await Camera.findByPk(cameraId);
//     const group = await CameraGroup.findByPk(groupId);

//     if (!camera || !group) {
//       res.status(404).json({ error: "Camera or Group not found" });
//       return;
//     }

//     await group.removeCamera(camera);
//     res.status(200).json({ message: "Camera removed from group successfully" });
//   } catch (error: any) {
//     res.status(500).json({
//       error: "Failed to remove camera from group",
//       details: error.message,
//     });
//   }
// };

// // Get Cameras in a Group
// export const getCamerasInGroup = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { groupId } = req.params;

//     const group = await CameraGroup.findByPk(groupId, {
//       include: Camera,
//     });

//     if (!group) {
//       res.status(404).json({ error: "Group not found" });
//       return;
//     }

//     res.status(200).json(group.Cameras);
//   } catch (error: any) {
//     res.status(500).json({
//       error: "Failed to fetch cameras in group",
//       details: error.message,
//     });
//   }
// };

// // Delete a Camera Group
// export const deleteGroup = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { groupId } = req.params;

//     const group = await CameraGroup.findByPk(groupId);

//     if (!group) {
//       res.status(404).json({ error: "Group not found" });
//       return;
//     }

//     await group.destroy();
//     res.status(200).json({ message: "Group deleted successfully" });
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ error: "Failed to delete group", details: error.message });
//   }
// };
