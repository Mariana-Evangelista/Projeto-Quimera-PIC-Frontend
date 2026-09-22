import { WavesArrowDown } from 'lucide-react';
import { BodyWaterLossResponseChart } from '../body-water-loss-response-chart';
import { RadialChartResult } from './radial-chart-result';

export function ExperimentResultBWL() {
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

      <RadialChartResult score="20" />

      <BodyWaterLossResponseChart />
    </div>
  );
}
