import { randomUUID } from "node:crypto";
import { WebSocket } from "ws";
import { handleMessage } from "./handlers/message.handler";
import { clientService } from "./services/client.service";

export function handleConnection(ws: WebSocket): void {
  const clientId = randomUUID();
  console.log("Client connected: ", clientId);

  clientService.addClient(clientId, ws);
  console.log("Online users: ", clientService.getOnlineCount());

  ws.on("message", (data) => {
    handleMessage(ws, data);
  });

  ws.on("close", () => {
    clientService.removeClient(clientId);
    console.log("Client disconnected: ", clientId);
    console.log("Online users: ", clientService.getOnlineCount());
  });

  ws.on("error", (error) => {
    console.error("WebSocket error: ", error);
  });

  ws.send(
    JSON.stringify({
      type: "WELCOME",
      message: "Connected Successfully",
      clientId,
    }),
  );
}
