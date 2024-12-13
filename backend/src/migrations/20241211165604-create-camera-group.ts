import { QueryInterface, Sequelize, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: QueryInterface,
    sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.createTable("CameraGroups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
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
    sequelize: Sequelize
  ): Promise<void> {
    await queryInterface.dropTable("CameraGroups");
  },
};
