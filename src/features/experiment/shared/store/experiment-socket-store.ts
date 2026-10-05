import {
  experimentSocketService,
  type JoinPayload,
  type ExperimentUpdatePayload,
  type ExperimentJoinRejectedPayload,
} from '../services/experiment-socket-service';

export interface ExperimentState extends ExperimentUpdatePayload {
  error?: string;
  isConnected: boolean;
}

export interface ExperimentSocketStore {
  getSnapshot(): ExperimentState;
  subscribe(onStoreChange: () => void): () => void;
  reconnect(): void;
}

export function createExperimentStore(joinPayload: JoinPayload, initialState: ExperimentState): ExperimentSocketStore {
  let snapshot: ExperimentState = {
    ...initialState,
    isConnected: experimentSocketService.isConnected(),
  };

  const expectedExperimentId = initialState.experimentId;

  const attemptJoin = () => {
    experimentSocketService.join(joinPayload, (ack) => {
      if (!ack.success) {
        snapshot = { ...snapshot, error: ack.error ?? 'Não foi possível entrar na sala.' };
      }
    });
  };

  const handleUpdate = (payload: ExperimentUpdatePayload) => {
    if (payload.experimentId !== expectedExperimentId) return;
    snapshot = { ...payload, error: undefined, isConnected: true };
  };

  const handleJoinRejected = (payload: ExperimentJoinRejectedPayload) => {
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
    getSnapshot(): ExperimentState {
      return snapshot;
    },

    subscribe(onStoreChange: () => void): () => void {
      const handleUpdateWrapped = (payload: ExperimentUpdatePayload) => {
        handleUpdate(payload);
        onStoreChange();
      };

      const handleJoinRejectedWrapped = (payload: ExperimentJoinRejectedPayload) => {
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

      experimentSocketService.onUpdate(handleUpdateWrapped);
      experimentSocketService.onJoinRejected(handleJoinRejectedWrapped);
      experimentSocketService.onConnect(handleConnectWrapped);
      experimentSocketService.onConnectError(handleConnectErrorWrapped);

      if (experimentSocketService.isConnected()) {
        attemptJoin();
      }

      return () => {
        experimentSocketService.offUpdate(handleUpdateWrapped);
        experimentSocketService.offJoinRejected(handleJoinRejectedWrapped);
        experimentSocketService.offConnect(handleConnectWrapped);
        experimentSocketService.offConnectError(handleConnectErrorWrapped);
        experimentSocketService.leave(joinPayload);
      };
    },

    reconnect,
  };
}
