import {
  bodyWaterLossChartSocketService,
  type JoinPayload,
  type UpdatePayload,
  type RejectedPayload,
  type AckResponse,
} from '../services/body-water-loss-chart-socket-service';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';

export interface BodyWaterLossChartSocketState {
  data: BodyWaterLossResponseChartTypes;
  error?: string;
  isConnected: boolean;
}

export interface BodyWaterLossChartSocketStore {
  getSnapshot(): BodyWaterLossChartSocketState;
  subscribe(onStoreChange: () => void): () => void;
  reconnect(): void;
}

export function createBodyWaterLossChartSocketStore(
  joinPayload: JoinPayload,
  initialState: BodyWaterLossResponseChartTypes
): BodyWaterLossChartSocketStore {
  let snapshot: BodyWaterLossChartSocketState = {
    data: initialState,
    error: undefined,
    isConnected: bodyWaterLossChartSocketService.isConnected(),
  };

  const attemptJoin = () => {
    bodyWaterLossChartSocketService.join(joinPayload, (ack: AckResponse) => {
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
    getSnapshot(): BodyWaterLossChartSocketState {
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

      bodyWaterLossChartSocketService.onUpdate(handleUpdateWrapped);
      bodyWaterLossChartSocketService.onJoinRejected(handleJoinRejectedWrapped);
      bodyWaterLossChartSocketService.onConnect(handleConnectWrapped);
      bodyWaterLossChartSocketService.onConnectError(handleConnectErrorWrapped);

      if (bodyWaterLossChartSocketService.isConnected()) {
        attemptJoin();
      }

      return () => {
        bodyWaterLossChartSocketService.offUpdate(handleUpdateWrapped);
        bodyWaterLossChartSocketService.offJoinRejected(handleJoinRejectedWrapped);
        bodyWaterLossChartSocketService.offConnect(handleConnectWrapped);
        bodyWaterLossChartSocketService.offConnectError(handleConnectErrorWrapped);
        bodyWaterLossChartSocketService.leave(joinPayload);
      };
    },

    reconnect,
  };
}
