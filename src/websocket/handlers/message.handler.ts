import { type RawData, WebSocket } from "ws";
import { clientService } from "../services/client.service";

export function handleMessage(ws: WebSocket, data: RawData): void {
  console.log("Received message:", data.toString());

  const clients = clientService.getAllClients();

  clients.forEach((client) => {
    if (client.socket !== ws && client.socket.readyState === WebSocket.OPEN) {
      client.socket.send(data.toString());
    }
  });
}

export function broadCastOnlineCount(): void {
  const count = clientService.getOnlineCount();

  const message = JSON.stringify({
    type: "ONLINE_COUNT",
    count,
  });

  const clients = clientService.getAllClients();

  clients.forEach((client) => {
    if (client.socket.readyState === WebSocket.OPEN) {
      client.socket.send(message);
    }
  });
}
