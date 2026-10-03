'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { createBodyWaterLossChartSocketStore, type BodyWaterLossChartSocketState } from '../store/body-water-loss-chart-socket-store';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';

export function useBodyWaterLossChartSocket(
  pin: string,
  initialState: BodyWaterLossResponseChartTypes[]
): BodyWaterLossChartSocketState {
  const store = useMemo(
    () => createBodyWaterLossChartSocketStore({ pin }, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin]
  );

  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}