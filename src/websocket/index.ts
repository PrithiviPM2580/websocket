import { Server } from "node:http";
import { WebSocketServer } from "ws";
import { handleConnection } from "./connection";

export function initializeWebsocket(server: Server): WebSocketServer {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    handleConnection(ws);
  });

  console.log("Websocket server initialized");
  return wss;
}
