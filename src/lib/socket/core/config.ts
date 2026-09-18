import type { ManagerOptions, SocketOptions } from 'socket.io-client';

export const SOCKET_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8000';

export const DEFAULT_SOCKET_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: true,
};
