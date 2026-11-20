import { WebSocket } from "ws";

export interface ConnectedClient {
  id: string;
  socket: WebSocket;
  connectedAt: Date;
  username?: string;
}

export type WebSocketMessage =
  | { type: "CHAT"; message: string }
  | { type: "JOIN_ROOM"; roomId: string }
  | { type: "TYPING"; isTyping: boolean };
