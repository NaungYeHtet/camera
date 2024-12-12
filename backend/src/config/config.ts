// src/config/config.ts

import { Dialect } from "sequelize/types";
import { Sequelize } from "sequelize";

// Database configuration
const config = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "camera",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql" as Dialect,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: "camera_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql" as Dialect,
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: "camera_production",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql" as Dialect,
  },
};

export default config;
