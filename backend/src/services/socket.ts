import { Server } from "socket.io";
import { Camera } from "../models";

export const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    const interval = setInterval(async () => {
      try {
        const cameras = await Camera.findAll({
          attributes: ["id", "name", "status"],
        });

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
    }, 10000);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
};
