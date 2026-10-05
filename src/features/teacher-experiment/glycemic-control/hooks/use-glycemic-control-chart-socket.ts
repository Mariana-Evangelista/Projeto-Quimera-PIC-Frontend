'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  createGlycemicControlChartSocketStore,
  type GlycemicControlChartSocketState,
  type GlycemicControlChartSocketStore,
} from '../store/glycemic-control-chart-socket-store';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';

interface UseGlycemicControlChartSocketReturn extends GlycemicControlChartSocketState {
  reconnect: GlycemicControlChartSocketStore['reconnect'];
}

export function useGlycemicControlChartSocket(
  pin: string,
  initialState: GlycemicControlResponseChartTypes
): UseGlycemicControlChartSocketReturn {
  const store = useMemo(
    () => createGlycemicControlChartSocketStore({ pin }, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin]
  );

  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  return {
    ...snapshot,
    reconnect: store.reconnect,
  };
}
