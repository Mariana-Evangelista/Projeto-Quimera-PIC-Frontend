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
import { DialogConfirmAction } from '@/components/dialog-confirm-action';
import {
  GlycemicControlResponseFormData,
  GlycemicControlResponseSchema,
} from '../../schemas/create-glycemic-control-response-schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UseCreateGlycemicControlResponse } from '../../hooks/use-create-glycemic-control-response';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useState } from 'react';

export function ExperimentQuestions() {
  const experimentQuestions = GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS;

  const [openDialog, setOpenDialog] = useState(false);

  const { isLoading, onSubmit, state } = UseCreateGlycemicControlResponse();

  const { control, handleSubmit } = useForm<GlycemicControlResponseFormData>({
    resolver: zodResolver(GlycemicControlResponseSchema),
    defaultValues: {
      question_1: '',
      question_2: '',
      question_3: '',
      question_4: '',
      question_5: '',
    },
  });

  return (
    <Questionnaire className="mt-12">
      {!state.success && state.message && (
        <Alert variant="destructive" className="text-start">
          <AlertCircleIcon className="mr-2 h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
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
      {experimentQuestions.map((question, index) => {
        const fieldName = `question_${index + 1}` as
          | 'question_1'
          | 'question_2'
          | 'question_3'
          | 'question_4'
          | 'question_5';
        return (
          <Controller
            key={index}
            name={fieldName}
            control={control}
            render={({ field }) => (
              <QuestionnaireItem name={fieldName} required>
                <QuestionnaireTitle className="mb-4">{question.title}</QuestionnaireTitle>
                <QuestionnaireDescription>{question.description}</QuestionnaireDescription>

                <QuestionnaireChoices>
                  {question.options.map((option) => (
                    <QuestionnaireChoice
                      key={option.value}
                      value={field.value}
                      onChange={() => field.onChange(option.value)}
                    >
                      {option.label}
                    </QuestionnaireChoice>
                  ))}
                </QuestionnaireChoices>
                <QuestionnaireError>Selecione uma opção para continuar.</QuestionnaireError>
              </QuestionnaireItem>
            )}
          />
        );
      })}

      <QuestionnaireActions>
        <QuestionnairePrevious className="cursor-pointer">Voltar</QuestionnairePrevious>
        <QuestionnaireNext className="cursor-pointer">Próximo</QuestionnaireNext>

        <DialogConfirmAction
          title="Tem certeza que deseja enviar sua resposta?"
          description="Não será possível voltar para editar ao clicar em confirmar."
          isPending={isLoading}
          open={openDialog}
          setOpen={setOpenDialog}
          onConfirmAction={handleSubmit((data) => {
            onSubmit(data);
            setOpenDialog(false);
          })}
        >
          <QuestionnaireSubmit className="cursor-pointer">Enviar Respostas</QuestionnaireSubmit>
        </DialogConfirmAction>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
