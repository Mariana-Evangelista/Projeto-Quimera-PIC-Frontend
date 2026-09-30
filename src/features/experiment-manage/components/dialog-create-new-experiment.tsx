'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useTransition } from 'react';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';
import {
  ExperimentManageFormData,
  ExperimentManageSchema,
} from '../schema/experiment-manage-schema';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon, ClipboardPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperimentManageForm } from './experiment-manage-form';
import { CreateNewExperimentAction } from '../actions/create-new-experiment-actions';
import { DialogSuccess } from './dialog-success';

export function DialogCreateNewExperiment() {
  const CreateNewExperimentFormState: ExperimentManageFormState = {
    success: false,
  };
  const [createOpen, setCreateOpen] = useState(false);
  const [state, setState] = useState<ExperimentManageFormState>(CreateNewExperimentFormState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, reset } = useForm<ExperimentManageFormData>({
    resolver: zodResolver(ExperimentManageSchema),
    mode: 'onBlur',
    defaultValues: {
      type: state.inputs?.type,
      class: state.inputs?.class ?? '',
      university: state.inputs?.university ?? '',
    },
  });

  function onSubmit(data: ExperimentManageFormData) {
    startTransition(async () => {
      const result = await CreateNewExperimentAction(state, data);

      setState(result);

      if (result.success) {
        reset();
        (document.activeElement as HTMLElement)?.blur();
        setDialogOpen(true);
        setCreateOpen(false);
      }
    });
  }

  return (
    <>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <ClipboardPlus />
            Novo Experimento
          </Button>
        </DialogTrigger>

        <DialogContent className="pt-8 md:min-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardPlus size={18} />
                Criar novo experimento
              </DialogTitle>
              <DialogDescription>
                Selecione o tipo de experimento a ser criado e digite informações da sua turma
              </DialogDescription>
            </DialogHeader>

            {!state.success && state.message && (
              <Alert variant="destructive" className="text-start">
                <AlertCircleIcon className="mr-2 h-4 w-4" />
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <ExperimentManageForm control={control} type="created" />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer" disabled={isPending}>
                {isPending && <Spinner />}
                Criar Experimento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DialogSuccess
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Experimento criado com sucesso!"
        description="Deseja ir para a página do experimento?"
      >
        <Button className="cursor-pointer">Ver Experimento</Button>
      </DialogSuccess>
    </>
  );
}
