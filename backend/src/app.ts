import express from "express";
import cors from "cors"; // Import the cors package
import cameraRoutes from "./routes/cameraRoutes";
import cameraGroupRoutes from "./routes/cameraGroupRoutes";
import sequelize from "./config/database";

const app = express();

// Enable CORS with options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", cameraRoutes);
app.use("/api", cameraGroupRoutes);

// Database connection
sequelize.sync().then(() => console.log("Database connected"));

export default app;
