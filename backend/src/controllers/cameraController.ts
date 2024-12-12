import { Request, Response } from "express";
import { Camera } from "../models/Camera";

export const getAllCameras = async (req: Request, res: Response) => {
  try {
    const cameras = await Camera.findAll();
    res.status(200).json(cameras);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cameras" });
  }
};
