import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Camera extends Model {
  public id!: number;
  public name!: string;
  public status!: string; // Active, Lost Connection, In Deployment
  public latitude!: number;
  public longitude!: number;
  public image!: string; // Image URL
}

Camera.init(
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
    status: {
      type: DataTypes.ENUM("Active", "Lost Connection", "In Deployment"),
      defaultValue: "In Deployment",
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
