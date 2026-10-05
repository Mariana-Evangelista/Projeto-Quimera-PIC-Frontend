'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  createBodyWaterLossChartSocketStore,
  type BodyWaterLossChartSocketState,
  type BodyWaterLossChartSocketStore,
} from '../store/body-water-loss-chart-socket-store';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';

interface UseBodyWaterLossChartSocketReturn extends BodyWaterLossChartSocketState {
  reconnect: BodyWaterLossChartSocketStore['reconnect'];
}

export function useBodyWaterLossChartSocket(
  pin: string,
  initialState: BodyWaterLossResponseChartTypes
): UseBodyWaterLossChartSocketReturn {
  const store = useMemo(
    () => createBodyWaterLossChartSocketStore({ pin }, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin]
  );

  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  return {
    ...snapshot,
    reconnect: store.reconnect,
  };
}
