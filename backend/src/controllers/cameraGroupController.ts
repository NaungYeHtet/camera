// src/controllers/cameraGroupController.ts
import { Request, Response } from "express";
import { CameraGroup } from "../models/CameraGroup";

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await CameraGroup.findAll();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};
