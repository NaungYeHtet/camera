import { QueryInterface, Sequelize, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.createTable("Cameras", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      departmentID: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.STRING,
      },
      remarks: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(
    queryInterface: QueryInterface,
    Sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.dropTable("Cameras");
  },
};
