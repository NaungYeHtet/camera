import express from "express";
import cors from "cors"; // Import the cors package
import cameraRoutes from "./routes/cameraRoutes";
import cameraGroupRoutes from "./routes/cameraGroupRoutes";
import alertRoutes from "./routes/alertRoutes";
import sequelize from "./config/database";
import path from "path";

const app = express();

// Enable CORS with options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// Routes
app.use("/api", cameraRoutes);
app.use("/api", cameraGroupRoutes);
app.use("/api", alertRoutes);

// Database connection
sequelize.sync().then(() => console.log("Database connected"));

export default app;
