import express from "express";
import cameraRoutes from "./routes/cameraRoutes";
import cameraGroupRoutes from "./routes/cameraGroupRoutes";
import sequelize from "./config/database";

const app = express();

app.use(express.json());

// Routes
app.use("/api", cameraRoutes);
app.use("/api", cameraGroupRoutes);

// Database connection
sequelize.sync().then(() => console.log("Database connected"));

export default app;
