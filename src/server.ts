import "dotenv/config";
import http from "node:http";
import app from "./app";
import { WebSocketServer } from "ws";
// import { initializeWebsocket } from "./websocket";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// initializeWebsocket(server);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message: string) => {
    console.log(`Received message: ${message.toString()}`);

    ws.send(message.toString());
  });
});

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
