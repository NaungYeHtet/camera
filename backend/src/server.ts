import app from "./app";
import { setupSocket } from "./services/socket";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setupSocket(server);
