import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { CameraGroup } from "./CameraGroup";
import { Camera } from "./Camera";

export class CameraGroupMap extends Model {
  declare cameraId: number;
  declare groupId: number;
}

CameraGroupMap.init(
  {
    cameraId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Camera,
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: CameraGroup,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "CameraGroupMaps",
  }
);
