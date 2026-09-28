'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Spinner } from '@/components/ui/spinner';
import {
  ExperimentManageFormData,
  ExperimentManageSchema,
} from '../schema/experiment-manage-schema';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';

interface ExperimentManageFormProps {
  formState: ExperimentManageFormState;
  type: 'create' | 'update';
  action: (
    state: ExperimentManageFormState,
    data: ExperimentManageFormData
  ) => Promise<ExperimentManageFormState>;
}

export function ExperimentManageForm({ formState, action, type }: ExperimentManageFormProps) {
  const [state, setState] = useState<ExperimentManageFormState>(formState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, reset } = useForm<ExperimentManageFormData>({
    resolver: zodResolver(ExperimentManageSchema),
    mode: 'onBlur',
    defaultValues: formState?.inputs,
  });

  function onSubmit(data: ExperimentManageFormData) {
    startTransition(async () => {
      const result = await action(state, data);

      setState(result);

      if (result.success) {
        reset();
        (document.activeElement as HTMLElement)?.blur();
        setDialogOpen(true);
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!state.success && state.message && (
          <Alert variant="destructive" className="mb-4 text-start">
            <AlertCircleIcon className="mr-2 h-4 w-4" />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <FieldGroup>
          <Controller
            name="university"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Universdade</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite o nome da Universidade"
                  type="text"
                  defaultValue={state.inputs?.university}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="class"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Turma</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite a turma"
                  type="text"
                  defaultValue={state.inputs?.class}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending && <Spinner />}
            {type === 'create' ? 'Criar Experimento' : 'Editar Experimento'}
          </Button>
        </FieldGroup>
      </form>

      {/* <TeacherSignupSuccessDialog open={dialogOpen} onOpenChange={setDialogOpen} /> */}
    </>
  );
}
