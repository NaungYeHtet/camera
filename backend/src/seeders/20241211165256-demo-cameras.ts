import { QueryInterface, Sequelize, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: QueryInterface,
    sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkInsert("Cameras", [
      {
        id: 1,
        name: "Camera 1",
        department: "Security",
        status: "active",
        longitude: 103.851959,
        latitude: 1.29027,
        image: "https://example.com/camera1.jpg",
        remarks: "Main gate camera",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Camera 2",
        department: "Traffic",
        status: "lost_connection",
        longitude: 103.861959,
        latitude: 1.30027,
        image: "https://example.com/camera2.jpg",
        remarks: "Street intersection camera",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(
    queryInterface: QueryInterface,
    sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.bulkDelete("Cameras", {}, {});
  },
};
