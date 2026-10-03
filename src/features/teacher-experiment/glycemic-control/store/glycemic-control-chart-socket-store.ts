import {
  glycemicControlChartSocketService,
  type JoinPayload,
  type UpdatePayload,
  type RejectedPayload,
  type AckResponse,
} from '../services/glycemic-control-chart-socket-service';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';

export interface GlycemicControlChartSocketState {
  data: GlycemicControlResponseChartTypes[];
  error?: string;
}

export function createGlycemicControlChartSocketStore(
  joinPayload: JoinPayload,
  initialState: GlycemicControlResponseChartTypes[]
) {
  let snapshot: GlycemicControlChartSocketState = {
    data: initialState,
    error: undefined,
  };

  return {
    getSnapshot(): GlycemicControlChartSocketState {
      return snapshot;
    },

    subscribe(onStoreChange: () => void): () => void {
      const attemptJoin = () => {
        glycemicControlChartSocketService.join(joinPayload, (ack: AckResponse) => {
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
      glycemicControlChartSocketService.onConnect(handleConnect);

      if (glycemicControlChartSocketService.isConnected()) {
        attemptJoin();
      }

      glycemicControlChartSocketService.onUpdate(handleUpdate);
      glycemicControlChartSocketService.onJoinRejected(handleJoinRejected);

      return () => {
        glycemicControlChartSocketService.offUpdate(handleUpdate);
        glycemicControlChartSocketService.offJoinRejected(handleJoinRejected);
        glycemicControlChartSocketService.offConnect(handleConnect);
        glycemicControlChartSocketService.leave(joinPayload);
      };
    },
  };
}
