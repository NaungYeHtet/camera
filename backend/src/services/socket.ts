import { Server } from "socket.io";

export const setupSocket = (server: any) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Emit camera statuses every 10 seconds
    const interval = setInterval(() => {
      const statuses = [
        { id: 1, status: "Active" },
        { id: 2, status: "Lost Connection" },
        { id: 3, status: "In Deployment" },
      ];
      socket.emit("cameraStatuses", statuses);
    }, 10000);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
};
