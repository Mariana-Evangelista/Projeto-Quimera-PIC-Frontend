import {
  glycemicControlChartSocketService,
  type JoinPayload,
  type UpdatePayload,
  type RejectedPayload,
  type AckResponse,
} from '../services/glycemic-control-chart-socket-service';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';

export interface GlycemicControlChartSocketState {
  data: GlycemicControlResponseChartTypes;
  error?: string;
  isConnected: boolean;
}

export interface GlycemicControlChartSocketStore {
  getSnapshot(): GlycemicControlChartSocketState;
  subscribe(onStoreChange: () => void): () => void;
  reconnect(): void;
}

export function createGlycemicControlChartSocketStore(
  joinPayload: JoinPayload,
  initialState: GlycemicControlResponseChartTypes
): GlycemicControlChartSocketStore {
  let snapshot: GlycemicControlChartSocketState = {
    data: initialState,
    error: undefined,
    isConnected: glycemicControlChartSocketService.isConnected(),
  };

  const attemptJoin = () => {
    glycemicControlChartSocketService.join(joinPayload, (ack: AckResponse) => {
      if (!ack.success) {
        snapshot = { ...snapshot, error: ack.error ?? 'Não foi possível entrar na sala.' };
      }
    });
  };

  const handleUpdate = (payload: UpdatePayload) => {
    snapshot = { ...snapshot, data: payload, error: undefined, isConnected: true };
  };

  const handleJoinRejected = (payload: RejectedPayload) => {
    snapshot = { ...snapshot, error: payload.message, isConnected: false };
  };

  const handleConnect = () => {
    snapshot = { ...snapshot, isConnected: true };
    attemptJoin();
  };

  const handleConnectError = (error: Error) => {
    snapshot = { ...snapshot, error: error.message, isConnected: false };
  };

  const reconnect = () => {
    snapshot = { ...snapshot, error: undefined };
    attemptJoin();
  };

  return {
    getSnapshot(): GlycemicControlChartSocketState {
      return snapshot;
    },

    subscribe(onStoreChange: () => void): () => void {
      const handleUpdateWrapped = (payload: UpdatePayload) => {
        handleUpdate(payload);
        onStoreChange();
      };

      const handleJoinRejectedWrapped = (payload: RejectedPayload) => {
        handleJoinRejected(payload);
        onStoreChange();
      };

      const handleConnectWrapped = () => {
        handleConnect();
        onStoreChange();
      };

      const handleConnectErrorWrapped = (error: Error) => {
        handleConnectError(error);
        onStoreChange();
      };

      glycemicControlChartSocketService.onUpdate(handleUpdateWrapped);
      glycemicControlChartSocketService.onJoinRejected(handleJoinRejectedWrapped);
      glycemicControlChartSocketService.onConnect(handleConnectWrapped);
      glycemicControlChartSocketService.onConnectError(handleConnectErrorWrapped);

      if (glycemicControlChartSocketService.isConnected()) {
        attemptJoin();
      }

      return () => {
        glycemicControlChartSocketService.offUpdate(handleUpdateWrapped);
        glycemicControlChartSocketService.offJoinRejected(handleJoinRejectedWrapped);
        glycemicControlChartSocketService.offConnect(handleConnectWrapped);
        glycemicControlChartSocketService.offConnectError(handleConnectErrorWrapped);
        glycemicControlChartSocketService.leave(joinPayload);
      };
    },

    reconnect,
  };
}
