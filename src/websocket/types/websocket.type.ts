import { WebSocket } from "ws";

export interface ConnectedClient {
  id: string;
  socket: WebSocket;
  connectedAt: Date;
  username?: string;
}
