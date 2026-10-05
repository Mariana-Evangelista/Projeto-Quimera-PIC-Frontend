'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { createExperimentStore, ExperimentState, ExperimentSocketStore } from '../store/experiment-socket-store';

interface UseExperimentSocketReturn extends ExperimentState {
  reconnect: ExperimentSocketStore['reconnect'];
}

export function useExperimentSocket(
  pin: string,
  slug: string,
  initialState: ExperimentState
): UseExperimentSocketReturn {
  const store = useMemo(
    () => createExperimentStore({ pin, slug }, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin, slug]
  );

  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  return {
    ...snapshot,
    reconnect: store.reconnect,
  };
}
