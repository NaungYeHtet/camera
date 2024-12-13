import { QueryInterface, Sequelize } from "sequelize";
import { faker } from "@faker-js/faker";

module.exports = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    const fakeAlerts = [];
    for (let i = 0; i < 50; i++) {
      fakeAlerts.push({
        cameraId: faker.number.int({ min: 1, max: 10 }),
        time: faker.date.recent(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("CameraAlerts", fakeAlerts, {});
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkDelete("CameraAlerts", {}, {});
  },
};
