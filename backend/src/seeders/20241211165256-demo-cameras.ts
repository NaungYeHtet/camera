import { QueryInterface, Sequelize } from "sequelize";
import * as fs from "fs";
import * as path from "path";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: QueryInterface,
    sequelize: Sequelize
  ): Promise<void> {
    const cameraData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./data/cameraData.json"), "utf8")
    );

    // const formattedCameraData = cameraData.map((camera: any) => {
    //   return {
    //     ...camera,
    //     createdAt: new Date(camera.createdAt).toISOString(),
    //     updatedAt: new Date(camera.updatedAt).toISOString(),
    //   };
    // });

    // Bulk insert data into the Cameras table
    await queryInterface.bulkInsert("Cameras", cameraData);
  },

  async down(
    queryInterface: QueryInterface,
    sequelize: Sequelize
  ): Promise<void> {
    // Delete all records from the Cameras table
    await queryInterface.bulkDelete("Cameras", {}, {});
  },
};
