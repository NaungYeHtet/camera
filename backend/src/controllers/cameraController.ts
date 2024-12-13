import { Request, Response } from "express";
import { Op } from "sequelize";
import { Department, Camera, CameraGroup, CameraAlert } from "../models";

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
              "$Department.name$": {
                [Op.like]: `%${search}%`, // Join with Department and search by name
              },
            },
            {
              "$CameraGroups.name$": {
                [Op.like]: `%${search}%`, // Search by group name
              },
            },
          ],
        }
      : {};

    const cameras = await Camera.findAll({
      where: whereClause,
      include: [
        {
          model: Department,
          attributes: [],
        },
        {
          model: CameraGroup,
          through: { attributes: [] },
          attributes: [],
        },
        {
          model: CameraAlert,
          attributes: ["id"], // Only fetch the alert IDs to determine `hasAlerts`
        },
      ],
    });

    const camerasWithAlerts = cameras.map((camera) => {
      return {
        ...camera.toJSON(),
        hasAlerts: camera.CameraAlerts && camera.CameraAlerts.length > 0,
      };
    });

    res.status(200).json(camerasWithAlerts);
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
