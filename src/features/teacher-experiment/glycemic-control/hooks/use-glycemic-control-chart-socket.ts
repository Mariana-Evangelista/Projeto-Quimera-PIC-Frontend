'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { createGlycemicControlChartSocketStore, type GlycemicControlChartSocketState } from '../store/glycemic-control-chart-socket-store';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';

export function useGlycemicControlChartSocket(
  pin: string,
  initialState: GlycemicControlResponseChartTypes[]
): GlycemicControlChartSocketState {
  const store = useMemo(
    () => createGlycemicControlChartSocketStore({ pin }, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin]
  );

  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}