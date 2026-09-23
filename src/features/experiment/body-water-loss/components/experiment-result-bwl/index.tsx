'use client';

import { useSyncExternalStore } from 'react';
import { WavesArrowDown } from 'lucide-react';
import { BodyWaterLossResponseChart } from '../body-water-loss-response-chart';
import { RadialChartResult } from './radial-chart-result';
import { ExperimentWaitingRoom } from '@/features/experiment/shared/components/experiment-waiting-room';

const SCORE_KEY = 'student-score';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return sessionStorage.getItem(SCORE_KEY) ?? null;
}

function getServerSnapshot() {
  return null;
}

export function ExperimentResultBWL() {
  const score = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!score) {
    return <ExperimentWaitingRoom message="" />;
  }

  return (
    <div className="w-full space-y-4 sm:p-8">
      <div className="text-primary space-y-4">
        <div className="border-border flex h-10 w-10 items-center justify-center rounded-full border shadow-sm">
          <WavesArrowDown />
        </div>
        <h3 className="text-lg font-semibold sm:text-xl">Resultado do Experimento</h3>
        <p className="text-foreground text-sm">
          Veja abaixo seus resultados individuais e compare com o desempenho geral da sala.
        </p>
      </div>

      <RadialChartResult score={score} />

      <BodyWaterLossResponseChart />
    </div>
  );
}
