import "dotenv/config";
import http from "node:http";
import app from "./app";
import { WebSocketServer } from "ws";
import type { RawData } from "ws";
// import { initializeWebsocket } from "./websocket";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// initializeWebsocket(server);
const wss = new WebSocketServer({ server });

let totalClients = 0;

wss.on("connection", (ws) => {
  totalClients++;
  console.log(`New client connected`);
  console.log(`Total clients connected: ${totalClients}`);

  ws.on("message", (data: RawData) => {
    const message = data.toString();
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    totalClients--;
    console.log(`Client disconnected`);
    console.log(`Total clients connected: ${totalClients}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
