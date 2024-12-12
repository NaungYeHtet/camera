import { Server } from "socket.io";
import { Camera } from "../models/Camera"; // Import your camera model

export const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Frontend URL (replace with your frontend URL)
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true, // Allow cookies and credentials (optional)
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Emit camera statuses every 10 seconds
    const interval = setInterval(async () => {
      try {
        // Fetch all cameras and their statuses from the database
        const cameras = await Camera.findAll({
          attributes: ["id", "name", "status"],
        });

        // Emit the current statuses to the connected client
        socket.emit(
          "cameraStatuses",
          cameras.map((camera) => ({
            id: camera.id,
            status: camera.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching camera statuses", error);
      }
    }, 10000); // every 10 seconds

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
};
