import {
  bodyWaterLossChartSocketService,
  type JoinPayload,
  type UpdatePayload,
  type RejectedPayload,
  type AckResponse,
} from '../services/body-water-loss-chart-socket-service';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';

export interface BodyWaterLossChartSocketState {
  data: BodyWaterLossResponseChartTypes[];
  error?: string;
}

export function createBodyWaterLossChartSocketStore(
  joinPayload: JoinPayload,
  initialState: BodyWaterLossResponseChartTypes[]
) {
  let snapshot: BodyWaterLossChartSocketState = {
    data: initialState,
    error: undefined,
  };

  return {
    getSnapshot(): BodyWaterLossChartSocketState {
      return snapshot;
    },

    subscribe(onStoreChange: () => void): () => void {
      const attemptJoin = () => {
        bodyWaterLossChartSocketService.join(joinPayload, (ack: AckResponse) => {
          if (!ack.success) {
            snapshot = { ...snapshot, error: ack.error ?? 'Não foi possível entrar na sala.' };
            onStoreChange();
          }
        });
      };

      const handleUpdate = (payload: UpdatePayload) => {
        snapshot = { ...snapshot, data: payload.chart, error: undefined };
        onStoreChange();
      };

      const handleJoinRejected = (payload: RejectedPayload) => {
        snapshot = { ...snapshot, error: payload.message };
        onStoreChange();
      };

      const handleConnect = () => attemptJoin();
      bodyWaterLossChartSocketService.onConnect(handleConnect);

      if (bodyWaterLossChartSocketService.isConnected()) {
        attemptJoin();
      }

      bodyWaterLossChartSocketService.onUpdate(handleUpdate);
      bodyWaterLossChartSocketService.onJoinRejected(handleJoinRejected);

      return () => {
        bodyWaterLossChartSocketService.offUpdate(handleUpdate);
        bodyWaterLossChartSocketService.offJoinRejected(handleJoinRejected);
        bodyWaterLossChartSocketService.offConnect(handleConnect);
        bodyWaterLossChartSocketService.leave(joinPayload);
      };
    },
  };
}
