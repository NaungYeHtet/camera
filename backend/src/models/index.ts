import { Camera } from "./Camera";
import { CameraAlert } from "./CameraAlert";
import { CameraGroup } from "./CameraGroup";
import { CameraGroupMap } from "./CameraGroupMap";
import { Department } from "./Department";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "camera",
});

CameraGroupMap.belongsTo(Camera, { foreignKey: "cameraId" });
CameraGroupMap.belongsTo(CameraGroup, { foreignKey: "groupId" });
CameraGroup.hasMany(CameraGroupMap, { foreignKey: "groupId" });
Camera.hasMany(CameraGroupMap, { foreignKey: "cameraId" });
Camera.belongsTo(Department);
Camera.hasMany(CameraAlert);
Department.hasMany(Camera);
Camera.belongsToMany(CameraGroup, {
  through: CameraGroupMap,
  foreignKey: "cameraId",
  otherKey: "groupId",
});
CameraGroup.belongsToMany(Camera, {
  through: CameraGroupMap,
  foreignKey: "groupId",
  otherKey: "cameraId",
});
CameraAlert.belongsTo(Camera, { foreignKey: "cameraId" });

export {
  Camera,
  CameraGroup,
  CameraGroupMap,
  Department,
  CameraAlert,
  sequelize,
};
