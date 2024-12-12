import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Camera } from "./Camera";
import { CameraGroup } from "./CameraGroup";

export class CameraGroupMap extends Model {
  public cameraId!: number;
  public groupId!: number;
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
    tableName: "camera_group_mapping",
  }
);

Camera.belongsToMany(CameraGroup, { through: CameraGroupMap });
CameraGroup.belongsToMany(Camera, { through: CameraGroupMap });
