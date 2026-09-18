export const SOCKET_EVENTS = {
  JOIN: 'join',
  LEAVE: 'leave',
  JOIN_REJECTED: 'join-rejected',
  UPDATED: 'update',
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
