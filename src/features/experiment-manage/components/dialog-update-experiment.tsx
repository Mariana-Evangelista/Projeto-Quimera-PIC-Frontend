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
import { AlertCircleIcon, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperimentManageForm } from './experiment-manage-form';
import { DialogSuccess } from './dialog-success';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { UpdateExperimentAction } from '../actions/update-experiment-action';

interface DialogUpdateExperimentProps {
  experiment: ExperimentDataTypes;
}

export function DialogUpdateExperiment({ experiment }: DialogUpdateExperimentProps) {
  const UpdateExperimentFormState: ExperimentManageFormState = {
    success: false,
    inputs: {
      type: experiment.type,
      university: experiment.university,
      class: experiment.class,
      _id: experiment._id,
    },
  };

  const [createOpen, setCreateOpen] = useState(false);
  const [state, setState] = useState<ExperimentManageFormState>(UpdateExperimentFormState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, reset } = useForm<ExperimentManageFormData>({
    resolver: zodResolver(ExperimentManageSchema),
    mode: 'onBlur',
    defaultValues: state?.inputs,
  });

  function onSubmit(data: ExperimentManageFormData) {
    startTransition(async () => {
      const result = await UpdateExperimentAction(state, data);

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
        <DialogTrigger className="group/dropdown-menu-item hover:bg-accent focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:*:[svg]:text-destructive relative flex w-full cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-9.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <Edit />
          Editar
        </DialogTrigger>

        <DialogContent className="pt-8 md:min-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit size={18} />
                Editar dados do experimento
              </DialogTitle>
              <DialogDescription>
                Atenção, o tipo do experimento não pode ser alterado.
              </DialogDescription>
            </DialogHeader>
            {!state.success && state.message && (
              <Alert variant="destructive" className="mb-4 text-start">
                <AlertCircleIcon className="mr-2 h-4 w-4" />
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <ExperimentManageForm control={control} type="update" />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer" disabled={isPending}>
                {isPending && <Spinner />}
                Editar Experimento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DialogSuccess
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Experimento atualizado com sucesso!"
        description="Deseja ir para a página do experimento?"
      >
        <Button className="cursor-pointer">Ver Experimento</Button>
      </DialogSuccess>
    </>
  );
}
