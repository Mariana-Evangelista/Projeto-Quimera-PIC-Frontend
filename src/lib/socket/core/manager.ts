import { io, type Socket, type ManagerOptions, type SocketOptions } from 'socket.io-client';
import { SOCKET_BASE_URL, DEFAULT_SOCKET_OPTIONS } from './config';

class SocketManager {
  private connections = new Map<string, Socket>();

  getConnection(path: string, options?: Partial<ManagerOptions & SocketOptions>): Socket {
    const existing = this.connections.get(path);
    if (existing) return existing;

    const socket = io(`${SOCKET_BASE_URL}${path}`, {
      ...DEFAULT_SOCKET_OPTIONS,
      ...options,
    });

    this.connections.set(path, socket);
    return socket;
  }

  closeConnection(path: string): void {
    this.connections.get(path)?.disconnect();
    this.connections.delete(path);
  }

  closeAll(): void {
    this.connections.forEach((socket) => socket.disconnect());
    this.connections.clear();
  }
}

export const socketManager = new SocketManager();
