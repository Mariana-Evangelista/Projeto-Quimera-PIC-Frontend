'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { TeacherSignupFormState } from '../types/teacher-signup-form-state';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeacherSignupFormData, TeacherSignupSchema } from '../schemas/teacher-signup-schema';
import { useActionState, useTransition } from 'react';
import { TeacherSignupAction } from '../actions/teacher-signup-action';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { TeacherSignupSuccessDialog } from './teacher-signup-success-dialog';

const TeacherSignupInitialFormState: TeacherSignupFormState = {
  success: false,
};

export function TeacherSignupForm() {
  const [state, formAction] = useActionState(TeacherSignupAction, TeacherSignupInitialFormState);
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<TeacherSignupFormData>({
    resolver: zodResolver(TeacherSignupSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(data: TeacherSignupFormData) {
    startTransition(() => {
      formAction(data);
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
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite seu nome"
                  type="text"
                  defaultValue={state.inputs?.name}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite seu e-mail"
                  type="email"
                  defaultValue={state.inputs?.email}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite sua senha"
                  type="password"
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending && <Spinner />}
            Cadastrar
          </Button>
        </FieldGroup>

        <p className="mt-4 text-center text-sm">
          <Link href="/login" className="hover:text-muted-foreground underline">
            Já possui uma conta? Faça Login!
          </Link>
        </p>
      </form>

      {state.success && <TeacherSignupSuccessDialog />}
    </>
  );
}
