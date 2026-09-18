import { SocketService } from '@/lib/socket';

export interface JoinPayload {
  pin: string;
  slug: string;
}

export interface ExperimentUpdatePayload {
  experimentId: string;
  liberateSend: boolean;
  liberateResult: boolean;
}

export interface ExperimentJoinRejectedPayload {
  message: string;
}

export interface ExperimentJoinAckResponse {
  success: boolean;
  experimentId?: string;
  error?: string;
}

export const experimentSocketService = new SocketService<
  JoinPayload,
  ExperimentUpdatePayload,
  ExperimentJoinRejectedPayload,
  ExperimentJoinAckResponse
>('/experiment');
