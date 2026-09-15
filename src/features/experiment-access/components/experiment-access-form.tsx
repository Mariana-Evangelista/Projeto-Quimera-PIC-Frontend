'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ExperimentAccessFormState } from '../types/experiment-acces-form-state';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ExperimentAccessFormData,
  ExperimentAccessSchema,
} from '../schemas/experiment-access-schema';
import { useActionState, useTransition } from 'react';
import { ExperimentAccessAction } from '../actions/experiment-access-action';

const ExperimentAccessInitialFormState: ExperimentAccessFormState = {
  success: false,
};

export function ExperimentAccessForm() {
  const [state, formAction] = useActionState(
    ExperimentAccessAction,
    ExperimentAccessInitialFormState
  );
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<ExperimentAccessFormData>({
    resolver: zodResolver(ExperimentAccessSchema),
    mode: 'onBlur',
    defaultValues: {
      student: '',
      pin: '',
    },
  });

  function onSubmit(data: ExperimentAccessFormData) {
    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!state.success && state.message && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon className="mr-2 h-4 w-4" />

          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <FieldGroup>
        <Controller
          name="student"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nome do Aluno</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite o seu nome"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="pin"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>PIN</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite o PIN do experimento"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Button type="submit" className="cursor-pointer" disabled={isPending}>
          Entrar
        </Button>
      </FieldGroup>
    </form>
  );
}
