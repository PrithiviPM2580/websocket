import { randomUUID } from "node:crypto";
import { WebSocket } from "ws";
import {
  broadCastOnlineCount,
  handleMessage,
} from "./handlers/message.handler";
import { clientService } from "./services/client.service";

export function handleConnection(ws: WebSocket): void {
  const socketId = randomUUID();

  clientService.addClient(socketId, ws);

  console.log(`Client connected: ${socketId}`);

  broadCastOnlineCount();

  ws.on("message", (data) => {
    handleMessage(ws, data);
  });

  ws.on("close", () => {
    clientService.removeClient(socketId);
    console.log(`Client disconnected: ${socketId}`);
    broadCastOnlineCount();
  });
}
