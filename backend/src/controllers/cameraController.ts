import { Request, Response } from "express";
import { Camera } from "../models/Camera";
import { Op } from "sequelize";

export const getAllCameras = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    console.log(req.query);
    const whereClause = search
      ? {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`, // Use LIKE for case-insensitive search in MySQL
              },
            },
            {
              department: {
                [Op.like]: `%${search}%`, // Use LIKE for department search as well
              },
            },
          ],
        }
      : {};

    const cameras = await Camera.findAll({
      where: whereClause,
    });
    res.status(200).json(cameras);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch cameras" });
  }
};

export const updateCameraStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(req.body);

    const validStatuses = ["Active", "Lost Connection", "Under Deployment"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }

    const camera = await Camera.findByPk(id);

    if (!camera) {
      res.status(405).json({ error: "Camera not found" });
      return;
    }

    camera.status = status;
    await camera.save();

    res.status(200).json(camera);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update camera status" });
  }
};
