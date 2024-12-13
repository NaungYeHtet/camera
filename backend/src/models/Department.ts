import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Camera } from "./Camera";

export class Department extends Model {
  declare id: number;
  declare name: string;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "departments",
  }
);
