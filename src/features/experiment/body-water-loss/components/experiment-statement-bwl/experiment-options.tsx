'use client';

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire';
import { BODY_WATER_LOSS_EXPERIMENT_OPTIONS } from '../../constants/body-water-loss-experiment-options';

export function ExperimentOptions() {
  const experimentOptions = BODY_WATER_LOSS_EXPERIMENT_OPTIONS;
  return (
    <Questionnaire
      className="mt-12"
      shortcuts="letters"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress
        className="w-full"
        render={(props, state) => (
          <div {...props}>
            <div className="mb-2 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: state.total }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < state.current
                      ? 'bg-primary h-1.5 flex-1 rounded-full'
                      : 'bg-muted h-1.5 flex-1 rounded-full'
                  }
                />
              ))}
            </div>
            <span>
              Resposta {state.current} de {state.total}
            </span>
          </div>
        )}
      />
      <QuestionnaireItem name="option_one" required>
        <QuestionnaireTitle className="mb-4">1. Primeira Etapa</QuestionnaireTitle>
        <QuestionnaireDescription>
          Ao avaliar o paciente, você precisa identificar qual estrutura do sistema nervoso central
          é responsável por detectar a queda de água no organismo e desencadear o limiar da sede.
          Selecione a estrutura correta.
        </QuestionnaireDescription>

        <QuestionnaireChoices>
          {experimentOptions.options_one.map((option) => (
            <QuestionnaireChoice key={option.value} value={option.value}>
              {option.label}
            </QuestionnaireChoice>
          ))}
        </QuestionnaireChoices>
        <QuestionnaireError>Selecione uma opção para continuar.</QuestionnaireError>
      </QuestionnaireItem>

      <QuestionnaireItem name="option_two" required>
        <QuestionnaireTitle className="mb-4">2. Segunda Etapa</QuestionnaireTitle>
        <QuestionnaireDescription>
          Identificado o centro de controle, você deve agora reconhecer qual hormônio é liberado em
          resposta a esse estímulo, atuando nos rins para aumentar a reabsorção de água e ajudar a
          reverter a desidratação do paciente. Selecione o hormônio correto.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          {experimentOptions.options_two.map((option) => (
            <QuestionnaireChoice key={option.value} value={option.value}>
              {option.label}
            </QuestionnaireChoice>
          ))}
        </QuestionnaireChoices>
        <QuestionnaireError>Selecione uma opção para continuar.</QuestionnaireError>
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious className="cursor-pointer">Voltar</QuestionnairePrevious>
        <QuestionnaireNext className="cursor-pointer">Próximo</QuestionnaireNext>
        <QuestionnaireSubmit className="cursor-pointer">Enviar Respostas</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
