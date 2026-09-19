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
import { BODY_WATER_LOSS_EXPERIMENT_QUESTIONS } from '../../constants/body-water-loss-experiment-questions';
import { usePathnameNavigation } from '@/features/experiment/shared/hooks/use-pathname-navigation';
import { DialogConfirmAction } from '@/features/experiment/shared/components/dialog-confirm-action';

export function ExperimentQuestions() {
  const experimentQuestions = BODY_WATER_LOSS_EXPERIMENT_QUESTIONS;

  const { isPending, startPathnameNavigation } = usePathnameNavigation({
    name: 'is_send_response',
    value: 'true',
  });

  const handleSubmitResponse = () => {
    startPathnameNavigation();
  };

  return (
    <Questionnaire className="mt-12">
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
        <QuestionnaireItem key={index} name={`option_${index + 1}`} required>
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

        <DialogConfirmAction
          title="Tem certeza que deseja enviar sua resposta?"
          description="Não será possível voltar para editar ao clicar em confirmar."
          onConfirmAction={handleSubmitResponse}
          isPending={isPending}
        >
          <QuestionnaireSubmit className="cursor-pointer">Enviar Respostas</QuestionnaireSubmit>
        </DialogConfirmAction>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
