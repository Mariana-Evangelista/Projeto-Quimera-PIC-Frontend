import { TestTubeDiagonal } from 'lucide-react';
import { ExperimentQuestions } from './experiment-questions';

export function ExperimentStatementGC() {
  return (
    <div className="space-y-4 sm:p-8">
      <div className="text-primary space-y-4">
        <div className="border-border flex h-10 w-10 items-center justify-center rounded-full border shadow-sm">
          <TestTubeDiagonal />
        </div>
        <h3 className="text-lg font-semibold sm:text-xl">
          Simulando o Controle Hormonal da Glicemia na Diabetes Mellitus Canina
        </h3>
      </div>

      <div className="text-sm sm:text-base">
        <p>
          Pipoca, um labrador de 8 meses, foi diagnosticado com Diabetes Mellitus após dosagens
          glicêmicas persistentemente acima de 280 mg/dL (valor normal: 65–118 mg/dL). Como
          responsável pelo caso, você deverá tomar decisões clínicas que simulam o manejo
          terapêutico do animal, aplicando seus conhecimentos sobre o eixo hormonal que regula a
          glicemia — insulina, glucagon, adrenalina e cortisol.
        </p>
        <br />
        <p>
          A seguir, você acompanhará o caso de Pipoca através de uma série de decisões clínicas.
          Cada questão representa uma etapa desse acompanhamento, exigindo a interpretação
          fisiopatológica do quadro e culminando em decisões cada vez mais complexas sobre o
          tratamento.
        </p>
      </div>

      <ExperimentQuestions />
    </div>
  );
}
