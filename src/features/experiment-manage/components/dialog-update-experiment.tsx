import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { AlertCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperimentManageForm } from './experiment-manage-form';
import { DialogSuccess } from './dialog-success';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { UpdateExperimentAction } from '../actions/update-experiment-action';
import { DialogTitle } from 'radix-ui/dialog';

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
      }
    });
  }

  return (
    <>
      <Dialog>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar dados do experimento</DialogTitle>
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

            <ExperimentManageForm control={control} formState={state.inputs} type="update" />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>{' '}
              </DialogClose>
              <Button type="submit" className="cursor-pointer" disabled={isPending}>
                {isPending && <Spinner />}
                Editar Experimento
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <DialogSuccess
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Experimento atualizado com sucesso!"
      />
    </>
  );
}
