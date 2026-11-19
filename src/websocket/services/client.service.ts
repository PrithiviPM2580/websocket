import { WebSocket } from "ws";
import type { ConnectedClient } from "@/websocket/types/websocket.type";

class ClientService {
  private clients: Map<string, ConnectedClient> = new Map();

  addClient(id: string, socket: WebSocket): void {
    const client: ConnectedClient = {
      id,
      socket,
      connectedAt: new Date(),
    };
    this.clients.set(id, client);
  }

  removeClient(id: string): void {
    this.clients.delete(id);
  }

  getClient(id: string): ConnectedClient | undefined {
    return this.clients.get(id);
  }

  getAllClients(): ConnectedClient[] {
    return Array.from(this.clients.values());
  }

  getOnlineCount(): number {
    return this.clients.size;
  }
}

export const clientService = new ClientService();
