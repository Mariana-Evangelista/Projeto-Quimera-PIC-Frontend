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
import { GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS } from '../../constants/glycemic-control-experiment-questions';

export function ExperimentQuestions() {
  const experimentQuestions = GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS;
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

      {experimentQuestions.map((question, index) => (
        <QuestionnaireItem key={index} name={`question_${index + 1}`} required>
          <QuestionnaireTitle className="mb-4">{question.title}</QuestionnaireTitle>
          <QuestionnaireDescription>{question.description}</QuestionnaireDescription>
          <QuestionnaireChoices>
            {question.options.map((option) => (
              <QuestionnaireChoice key={option.value} value={option.value}>
                {option.label}
              </QuestionnaireChoice>
            ))}
          </QuestionnaireChoices>
          <QuestionnaireError>Selecione uma opção para continuar.</QuestionnaireError>
        </QuestionnaireItem>
      ))}

      <QuestionnaireActions>
        <QuestionnairePrevious className="cursor-pointer">Voltar</QuestionnairePrevious>
        <QuestionnaireNext className="cursor-pointer">Próximo</QuestionnaireNext>
        <QuestionnaireSubmit className="cursor-pointer">Enviar Respostas</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
