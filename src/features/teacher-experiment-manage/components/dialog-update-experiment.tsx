'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { AlertCircleIcon, CheckCircle, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperimentManageForm } from './experiment-manage-form';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { UpdateExperimentAction } from '../actions/update-experiment-action';
import { DialogConfirmAction } from '@/components/dialog-confirm-action';
import { useRouter } from 'next/navigation';

interface DialogUpdateExperimentProps {
  experiment: ExperimentDataTypes;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DialogUpdateExperiment({ experiment, open, setOpen }: DialogUpdateExperimentProps) {
  const UpdateExperimentFormState: ExperimentManageFormState = {
    success: false,
    inputs: {
      type: experiment.type,
      university: experiment.university,
      class: experiment.class,
      _id: experiment._id,
    },
  };

  const [state, setState] = useState<ExperimentManageFormState>(UpdateExperimentFormState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

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
        setOpen(false);
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pt-8 md:min-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit size={18} />
                Editar dados do experimento
              </DialogTitle>
              <DialogDescription>
                Atualize as informações básicas do seu experimento.
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

      <DialogConfirmAction
        Icon={CheckCircle}
        variant="success"
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Experimento atualizado com sucesso!"
        description="Deseja ir para a página do experimento?"
        onConfirmAction={() => {
          setDialogOpen(false);
          router.push(`/teacher/experiment/${state.inputs?._id}`);
        }}
      />
    </>
  );
}
