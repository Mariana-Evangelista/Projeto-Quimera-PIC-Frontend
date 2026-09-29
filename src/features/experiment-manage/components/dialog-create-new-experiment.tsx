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
import { AlertCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperimentManageForm } from './experiment-manage-form';
import { CreateNewExperimentAction } from '../actions/create-new-experiment-actions';
import { DialogSuccess } from './dialog-success';

export function DialogCreateNewExperiment() {
  const CreateNewExperimentFormState: ExperimentManageFormState = {
    success: false,
  };
  const [state, setState] = useState<ExperimentManageFormState>(CreateNewExperimentFormState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, reset } = useForm<ExperimentManageFormData>({
    resolver: zodResolver(ExperimentManageSchema),
    mode: 'onBlur',
    defaultValues: {
      type: state.inputs?.type,
      class: state.inputs?.class,
      university: state.inputs?.university,
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
      }
    });
  }

  return (
    <>
      <Dialog>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar novo experimento</DialogTitle>
              <DialogDescription>
                Selecione o tipo de experimento a ser criado e digite informações da sua turma
              </DialogDescription>
            </DialogHeader>
            {!state.success && state.message && (
              <Alert variant="destructive" className="mb-4 text-start">
                <AlertCircleIcon className="mr-2 h-4 w-4" />
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <ExperimentManageForm control={control} formState={state.inputs} type="created" />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>{' '}
              </DialogClose>
              <Button type="submit" className="cursor-pointer" disabled={isPending}>
                {isPending && <Spinner />}
                Criar Experimento
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      ;
      <DialogSuccess
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Experimento criado com sucesso!"
        description="Deseja ir para a página do experimento?"
      >
        <Button>Ver Experimento</Button>
      </DialogSuccess>
    </>
  );
}
