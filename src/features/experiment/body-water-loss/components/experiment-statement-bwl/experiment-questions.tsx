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
import { DialogConfirmAction } from '@/features/experiment/shared/components/dialog-confirm-action';
import {
  BodyWaterLoosResponseFormData,
  BodyWaterLossResponseSchema,
} from '../../schemas/create-body-water-loss-response-schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UseCreateBodyWaterLossResponse } from '../../hooks/use-create-body-water-loss-response';

export function ExperimentQuestions() {
  const experimentQuestions = BODY_WATER_LOSS_EXPERIMENT_QUESTIONS;

  const { isLoading, onSubmit } = UseCreateBodyWaterLossResponse();

  const { control, handleSubmit } = useForm<BodyWaterLoosResponseFormData>({
    resolver: zodResolver(BodyWaterLossResponseSchema),
    defaultValues: {
      option_1: {
        value: '',
        weight: 0,
      },
      option_2: {
        value: '',
        weight: 0,
      },
    },
  });

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
        <Controller
          key={index}
          name={index === 0 ? 'option_1' : 'option_2'}
          control={control}
          render={({ field }) => (
            <QuestionnaireItem name={`option_${index + 1}`} required>
              <QuestionnaireTitle className="mb-4">{question.title}</QuestionnaireTitle>
              <QuestionnaireDescription>{question.description}</QuestionnaireDescription>

              <QuestionnaireChoices>
                {question.options.map((option) => (
                  <QuestionnaireChoice
                    key={option.value}
                    value={field.value.value}
                    onChange={() => field.onChange(option)}
                  >
                    {option.value}
                  </QuestionnaireChoice>
                ))}
              </QuestionnaireChoices>
              <QuestionnaireError>Selecione uma opção para continuar.</QuestionnaireError>
            </QuestionnaireItem>
          )}
        />
      ))}

      <QuestionnaireActions>
        <QuestionnairePrevious className="cursor-pointer">Voltar</QuestionnairePrevious>
        <QuestionnaireNext className="cursor-pointer">Próximo</QuestionnaireNext>

        <DialogConfirmAction
          title="Tem certeza que deseja enviar sua resposta?"
          description="Não será possível voltar para editar ao clicar em confirmar."
          isPending={isLoading}
          onConfirmAction={handleSubmit(onSubmit)}
        >
          <QuestionnaireSubmit className="cursor-pointer">Enviar Respostas</QuestionnaireSubmit>
        </DialogConfirmAction>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
