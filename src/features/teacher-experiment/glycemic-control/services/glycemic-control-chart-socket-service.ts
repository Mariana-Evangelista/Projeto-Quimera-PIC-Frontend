import { SocketService } from '@/lib/socket';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';

export interface JoinPayload {
  pin: string;
}

export type UpdatePayload = {
  chart: GlycemicControlResponseChartTypes[];
  experimentId: string;
};

export interface RejectedPayload {
  message: string;
}

export interface AckResponse {
  success: boolean;
  error?: string;
}

export const glycemicControlChartSocketService = new SocketService<
  JoinPayload,
  UpdatePayload,
  RejectedPayload,
  AckResponse
>('/glycemic-control-chart');
