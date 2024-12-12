import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class CameraGroup extends Model {
  public id!: number;
  public name!: string;
}

CameraGroup.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "camera_groups",
  }
);
