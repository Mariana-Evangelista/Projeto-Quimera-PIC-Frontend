'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { TeacherLoginFormState } from '../types/teacher-login-form-state';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeacherLoginFormData, TeacherLoginSchema } from '../schemas/teacher-login-schema';
import { useActionState, useTransition } from 'react';
import { TeacherLoginAction } from '../actions/teacher-login-action';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';

const TeacherLoginInitialFormState: TeacherLoginFormState = {
  success: false,
};

export function TeacherLoginForm() {
  const [state, formAction] = useActionState(TeacherLoginAction, TeacherLoginInitialFormState);
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<TeacherLoginFormData>({
    resolver: zodResolver(TeacherLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: TeacherLoginFormData) {
    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!state.success && state.message && (
        <Alert variant="destructive" className="mb-4 text-start">
          <AlertCircleIcon className="mr-2 h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <FieldGroup>
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
          Entrar
        </Button>
      </FieldGroup>

      <p className="mt-4 text-center text-sm">
        <Link href="/signup" className="hover:text-primary/80 underline">
          Não tem uma conta? Cadastre-se aqui
        </Link>
      </p>
    </form>
  );
}
