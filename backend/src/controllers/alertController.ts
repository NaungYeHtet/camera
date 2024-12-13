import { Request, Response } from "express";
import { CameraAlert } from "../models";
import sequelize from "sequelize";

export const alertDistribution = async (req: Request, res: Response) => {
  try {
    const { cameraIds } = req.body;

    // Query the database for counts of each alert type
    const alertCounts = await CameraAlert.findAll({
      attributes: [
        "type",
        [sequelize.fn("COUNT", sequelize.col("type")), "count"], // Count the alerts grouped by type
      ],
      where: {
        cameraId: cameraIds, // Filter for the selected cameras
        isActive: true, // Only include active alerts
      },
      group: ["type"], // Group by the alert type
    });

    const formattedResult = alertCounts.reduce((acc: any, alert: any) => {
      acc[alert.type] = parseInt(alert.getDataValue("count"), 10);
      return acc;
    }, {});

    res.status(200).json(formattedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to alert distribution" });
  }
};
