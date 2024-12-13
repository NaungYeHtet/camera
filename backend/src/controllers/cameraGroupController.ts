// src/controllers/cameraGroupController.ts
import { Request, Response } from "express";
import { CameraGroup, CameraGroupMap } from "../models";
import { Op, Sequelize } from "sequelize";
import { ValidationErrorItem } from "joi";
import Joi from "joi";
import { sequelize } from "../models";

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await CameraGroup.findAll();
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

const cameraIdsSchema = Joi.array()
  .items(Joi.number().integer().positive())
  .min(1)
  .required()
  .messages({
    "array.base": `"cameraIds" must be an array of numbers`,
    "array.min": `"cameraIds" must contain at least one cameraId`,
    "array.required": `"cameraIds" is required`,
    "number.base": `"cameraIds" should contain valid numbers`,
  });

export const getGroupByCameraIds = async (req: Request, res: Response) => {
  try {
    const { cameraIds } = req.body;

    const { error } = cameraIdsSchema.validate(cameraIds);
    if (error) {
      res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
      return;
    }

    const group = await CameraGroup.findOne({
      include: [
        {
          model: CameraGroupMap,
          where: {
            cameraId: {
              [Op.in]: cameraIds,
            },
          },
          required: true,
        },
      ],
      having: Sequelize.literal(`
        (SELECT COUNT(DISTINCT cameraId) FROM CameraGroupMaps WHERE CameraGroupMaps.groupId = CameraGroup.id) = ${cameraIds.length}
        AND 
        (SELECT COUNT(DISTINCT cameraId) FROM CameraGroupMaps WHERE CameraGroupMaps.groupId = CameraGroup.id AND CameraGroupMaps.cameraId IN (${cameraIds.join(",")})) = ${cameraIds.length}
      `),
    });

    console.log(group);

    if (!group) {
      res.status(200).json(null);
      return;
    }

    res.status(200).json(group);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch group" });
  }
};

const createGroupSchema = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    "string.empty": "Group name is required",
    "string.min": "Group name must be at least 3 characters",
    "string.max": "Group name must not exceed 100 characters",
  }),
  cameraIds: Joi.array()
    .items(Joi.number().integer().positive())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one camera ID is required",
      "array.includes": "All camera IDs must be valid integers",
    }),
});

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { error, value } = createGroupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err: ValidationErrorItem) => err.message),
      });
      return;
    }

    const { name, cameraIds }: { name: string; cameraIds: number[] } = value;

    console.log(cameraIds, name);

    const group = await CameraGroup.findOne({
      include: [
        {
          model: CameraGroupMap,
          where: {
            cameraId: {
              [Op.in]: cameraIds,
            },
          },
          required: true,
        },
      ],
      having: Sequelize.literal(`
        (SELECT COUNT(DISTINCT cameraId) FROM CameraGroupMaps WHERE CameraGroupMaps.groupId = CameraGroup.id) = ${cameraIds.length}
        AND 
        (SELECT COUNT(DISTINCT cameraId) FROM CameraGroupMaps WHERE CameraGroupMaps.groupId = CameraGroup.id AND CameraGroupMaps.cameraId IN (${cameraIds.join(",")})) = ${cameraIds.length}
      `),
    });

    if (group) {
      res.status(400).json({
        error: "A group with the exact same camera IDs already exists",
      });
      return;
    }

    const newGroup = await CameraGroup.create({ name });

    const cameraMappings = cameraIds.map((cameraId) => ({
      groupId: newGroup.id,
      cameraId,
    }));

    console.log(cameraMappings);
    await CameraGroupMap.bulkCreate(cameraMappings);

    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create group" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const t = await sequelize.transaction();

  try {
    await CameraGroupMap.destroy({
      where: { groupId },
      transaction: t,
    });

    await CameraGroup.destroy({
      where: { id: groupId },
      transaction: t,
    });

    await t.commit();

    res
      .status(200)
      .json({ message: "Camera group and its mappings deleted successfully" });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to delete camera group and its mappings" });
  }
};
