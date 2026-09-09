import { WavesArrowDown } from 'lucide-react';
import { ExperimentOptions } from './experiment-options';

export function ExperimentStatementBWL() {
  return (
    <div className="space-y-4 sm:p-8">
      <div className="text-primary space-y-4">
        <div className="border-border flex h-10 w-10 items-center justify-center rounded-full border shadow-sm">
          <WavesArrowDown />
        </div>
        <h3 className="text-lg font-semibold sm:text-xl">
          Controle Homeostático da Sede e Retenção Hídrica em Felinos
        </h3>
      </div>

      <div className="text-sm sm:text-base">
        <p>
          Diante do quadro de desidratação apresentado pelo paciente felino, o organismo desencadeia
          mecanismos homeostáticos para restabelecer o equilíbrio hídrico. Esse controle envolve a
          percepção da queda de água corporal e a ativação de uma resposta hormonal que promove a
          conservação de líquidos.
        </p>
        <br />
        <p>
          Com base no caso clínico apresentado, selecione a opção correta em cada uma das etapas
          abaixo:
        </p>
      </div>

      <ExperimentOptions />
    </div>
  );
}
