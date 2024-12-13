import { QueryInterface, Sequelize } from "sequelize";
import { faker } from "@faker-js/faker";

module.exports = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    const fakeAlerts = [];
    for (let i = 0; i < 50; i++) {
      fakeAlerts.push({
        cameraId: faker.number.int({ min: 1, max: 10 }),
        isActive: faker.datatype.boolean(),
        time: faker.date.recent(),
        type: faker.helpers.arrayElement([
          "Fire Alert",
          "Intrusion Alert",
          "Weather Alert",
          "Smoke Alert",
        ]),
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
