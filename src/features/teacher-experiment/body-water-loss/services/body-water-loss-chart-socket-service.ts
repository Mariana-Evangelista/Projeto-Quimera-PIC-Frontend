import { SocketService } from '@/lib/socket';
import {
  BodyWaterLossChartTypes,
  BodyWaterLossKPIsTypes,
} from '@/features/experiment-charts/types/body-water-loss-response-chart-types';

export interface JoinPayload {
  pin: string;
}

export type UpdatePayload = {
  chart: BodyWaterLossChartTypes[];
  experimentId: string;
  kpis: BodyWaterLossKPIsTypes;
};

export interface RejectedPayload {
  message: string;
}

export interface AckResponse {
  success: boolean;
  error?: string;
}

export const bodyWaterLossChartSocketService = new SocketService<
  JoinPayload,
  UpdatePayload,
  RejectedPayload,
  AckResponse
>('/body-water-loss-chart');
