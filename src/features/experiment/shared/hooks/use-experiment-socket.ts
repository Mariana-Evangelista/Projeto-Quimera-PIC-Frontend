'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { createExperimentStore, ExperimentState } from '../store/experiment-socket-store';

export function useExperimentSocket(
  pin: string,
  slug: string,
  initialState: ExperimentState
): ExperimentState {
  const store = useMemo(
    () => createExperimentStore({ pin, slug }, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin, slug]
  );

  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
