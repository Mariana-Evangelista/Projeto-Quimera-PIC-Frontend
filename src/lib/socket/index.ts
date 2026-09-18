import type { Socket } from 'socket.io-client';
import { socketManager } from './core/manager';
import { SOCKET_EVENTS } from './core/events';

export class SocketService<
  JoinPayload,
  UpdatePayload,
  JoinRejectedPayload = { message: string },
  JoinAckResponse = { success: boolean; error?: string },
> {
  constructor(private readonly path: string) {}

  private get socket(): Socket {
    return socketManager.getConnection(this.path);
  }

  join(payload: JoinPayload, callback?: (response: JoinAckResponse) => void): void {
    this.socket.emit(SOCKET_EVENTS.JOIN, payload, callback);
  }

  leave(payload: JoinPayload): void {
    this.socket.emit(SOCKET_EVENTS.LEAVE, payload);
  }

  onUpdate(listener: (payload: UpdatePayload) => void): void {
    this.socket.on(SOCKET_EVENTS.UPDATED, listener as (...args: unknown[]) => void);
  }

  offUpdate(listener: (payload: UpdatePayload) => void): void {
    this.socket.off(SOCKET_EVENTS.UPDATED, listener as (...args: unknown[]) => void);
  }

  onJoinRejected(listener: (payload: JoinRejectedPayload) => void): void {
    this.socket.on(SOCKET_EVENTS.JOIN_REJECTED, listener as (...args: unknown[]) => void);
  }

  offJoinRejected(listener: (payload: JoinRejectedPayload) => void): void {
    this.socket.off(SOCKET_EVENTS.JOIN_REJECTED, listener as (...args: unknown[]) => void);
  }

  onConnect(listener: () => void): void {
    this.socket.on('connect', listener);
  }

  offConnect(listener: () => void): void {
    this.socket.off('connect', listener);
  }

  isConnected(): boolean {
    return this.socket.connected;
  }

  disconnect(): void {
    socketManager.closeConnection(this.path);
  }
}
