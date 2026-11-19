import { type RawData, WebSocket } from "ws";

export function handleMessage(ws: WebSocket, data: RawData): void {
  const message = data.toString();
  console.log("Received: ", message);

  ws.send(
    JSON.stringify({
      type: "MESSAGE_RECEIVED",
      data: message,
    }),
  );
}
