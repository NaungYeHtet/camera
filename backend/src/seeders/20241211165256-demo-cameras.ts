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

    await queryInterface.bulkInsert("Cameras", cameraData);
  },

  async down(
    queryInterface: QueryInterface,
    sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkDelete("Cameras", {}, {});
  },
};
