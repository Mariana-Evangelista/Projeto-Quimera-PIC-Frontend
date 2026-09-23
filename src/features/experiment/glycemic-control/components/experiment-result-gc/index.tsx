'use client';

import { useSyncExternalStore } from 'react';
import { GlycemicControlResponseTypes } from '../../types/glycemic-control-response-types';
import { RadialChartResult } from './radial-chart-result';
import { GlycemicControlResponseChart } from '../glycemic-control-response-chart';
import { ExperimentWaitingRoom } from '@/features/experiment/shared/components/experiment-waiting-room';
import { QuestionComparison } from './question-comparison';
import { TestTubeDiagonal } from 'lucide-react';

const RESPONSE_KEY = 'student-response';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return sessionStorage.getItem(RESPONSE_KEY) ?? null;
}

function getServerSnapshot() {
  return null;
}

function parseResponse(raw: string | null): GlycemicControlResponseTypes | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as GlycemicControlResponseTypes;

    if (!parsed.answers || !Array.isArray(parsed.answers)) return null;

    let score = parsed.score;
    if (
      score === undefined ||
      score === null ||
      typeof score !== 'number' ||
      isNaN(score) ||
      score < 0 ||
      score > 100
    ) {
      score = parsed.answers.reduce((sum, a) => sum + (a.weight || 0), 0);
    }

    return { ...parsed, score };
  } catch {
    return null;
  }
}

export function ExperimentResultGC() {
  const rawResponse = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const response = parseResponse(rawResponse);

  if (!response) {
    return <ExperimentWaitingRoom message="" />;
  }

  return (
    <div className="w-full space-y-6 sm:p-8">
      <div className="text-primary space-y-4">
        <div className="border-border flex h-10 w-10 items-center justify-center rounded-full border shadow-sm">
          <TestTubeDiagonal />
        </div>
        <h3 className="text-lg font-semibold sm:text-xl">Resultado do Experimento</h3>

        <p className="text-foreground text-sm">
          Veja abaixo seus resultados individuais e compare com o desempenho geral da sala.
        </p>
      </div>

      <RadialChartResult score={response.score ?? 0} />
      <QuestionComparison answers={response.answers} />
      <GlycemicControlResponseChart />
    </div>
  );
}
