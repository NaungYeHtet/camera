import express from "express";
import cameraRoutes from "./routes/cameraRoutes";
import sequelize from "./config/database";

const app = express();

app.use(express.json());

// Routes
app.use("/api", cameraRoutes);

// Database connection
sequelize.sync().then(() => console.log("Database connected"));

export default app;
