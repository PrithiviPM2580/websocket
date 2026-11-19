import "dotenv/config";
import http from "node:http";
import app from "./app";
import { initializeWebsocket } from "./websocket";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeWebsocket(server);

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
