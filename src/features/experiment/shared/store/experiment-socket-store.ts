import {
  experimentSocketService,
  type JoinPayload,
  type ExperimentUpdatePayload,
  type ExperimentJoinRejectedPayload,
} from '../services/experiment-socket-service';

export interface ExperimentState extends ExperimentUpdatePayload {
  error?: string;
}

export function createExperimentStore(joinPayload: JoinPayload, initialState: ExperimentState) {
  let snapshot = initialState;

  const expectedExperimentId = initialState.experimentId;

  return {
    getSnapshot(): ExperimentState {
      return snapshot;
    },

    subscribe(onStoreChange: () => void): () => void {
      const attemptJoin = () => {
        experimentSocketService.join(joinPayload, (ack) => {
          if (!ack.success) {
            snapshot = { ...snapshot, error: ack.error ?? 'Não foi possível entrar na sala.' };
            onStoreChange();
          }
        });
      };

      const handleUpdate = (payload: ExperimentUpdatePayload) => {
        if (payload.experimentId !== expectedExperimentId) return;
        snapshot = { ...payload, error: undefined };
        onStoreChange();
      };

      const handleJoinRejected = (payload: ExperimentJoinRejectedPayload) => {
        snapshot = { ...snapshot, error: payload.message };
        onStoreChange();
      };

      const handleConnect = () => attemptJoin();
      experimentSocketService.onConnect(handleConnect);

      if (experimentSocketService.isConnected()) {
        attemptJoin();
      }

      experimentSocketService.onUpdate(handleUpdate);
      experimentSocketService.onJoinRejected(handleJoinRejected);

      return () => {
        experimentSocketService.offUpdate(handleUpdate);
        experimentSocketService.offJoinRejected(handleJoinRejected);
        experimentSocketService.offConnect(handleConnect);
        experimentSocketService.leave(joinPayload);
      };
    },
  };
}
