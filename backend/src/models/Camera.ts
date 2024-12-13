import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Department } from "./Department";
import { CameraAlert } from "./CameraAlert";

export class Camera extends Model {
  declare id: number;
  declare departmentId: number;
  declare name: string;
  declare status: string; // Active, Lost Connection, In Deployment
  declare latitude: number;
  declare longitude: number;
  declare image: string; // Image URL
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
    tableName: "cameras",
  }
);

Camera.belongsTo(Department);
