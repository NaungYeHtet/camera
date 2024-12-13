import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Camera } from "./Camera";

export class CameraAlert extends Model {
  declare id: number;
  declare cameraId: number;
  declare isActive: boolean;
  declare type:
    | "Fire Alert"
    | "Intrusion Alert"
    | "Weather Alert"
    | "Smoke Alert";
  declare datetime: string;
}

CameraAlert.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cameraId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Camera,
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "Fire Alert",
        "Intrusion Alert",
        "Weather Alert",
        "Smoke Alert"
      ),
      allowNull: false,
    },
    datetime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "CameraAlerts",
  }
);
