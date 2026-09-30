'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { TeacherSignupFormState } from '../types/teacher-signup-form-state';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon, CheckCircle } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeacherSignupFormData, TeacherSignupSchema } from '../schemas/teacher-signup-schema';
import { useState, useTransition } from 'react';
import { TeacherSignupAction } from '../actions/teacher-signup-action';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { DialogConfirmAction } from '@/components/dialog-confirm-action';
import { useRouter } from 'next/navigation';

const TeacherSignupInitialFormState: TeacherSignupFormState = {
  success: false,
};

export function TeacherSignupForm() {
  const [state, setState] = useState<TeacherSignupFormState>(TeacherSignupInitialFormState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<TeacherSignupFormData>({
    resolver: zodResolver(TeacherSignupSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(data: TeacherSignupFormData) {
    startTransition(async () => {
      const result = await TeacherSignupAction(state, data);

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

      <DialogConfirmAction
        variant="success"
        Icon={CheckCircle}
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Cadastro realizado com sucesso!"
        description="Deseja ir para a página de login?"
        onConfirmAction={() => {
          setDialogOpen(false);
          router.push('/login');
        }}
      />
    </>
  );
}
