import {
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";
import { Department } from "./Department";
import { CameraAlert } from "./CameraAlert";

export class Camera extends Model<
  InferAttributes<Camera>,
  InferCreationAttributes<Camera>
> {
  declare id: number;
  declare departmentId: number;
  declare name: string;
  declare status: "Active" | "Lost Connection" | "Under Deployment";
  declare latitude: number;
  declare longitude: number;
  declare image: string;
  declare CameraAlerts?: CameraAlert[];
  declare getCameraAlerts: HasManyGetAssociationsMixin<CameraAlert>;
}

Camera.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Lost Connection", "Under Deployment"),
      defaultValue: "Under Deployment",
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Cameras",
  }
);
