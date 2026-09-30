'use client';

import { DialogConfirmAction } from '@/components/dialog-confirm-action';
import { CircleAlert } from 'lucide-react';
import { useState, useTransition } from 'react';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';
import { DeleteExperimentAction } from '../actions/delete-experiment-action';

interface DeleteExperimentFeatureProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DeleteExperimentFeature({ id, open, setOpen }: DeleteExperimentFeatureProps) {
  const DeleteExperimentFormState: ExperimentManageFormState = {
    success: false,
  };
  const [state, setState] = useState<ExperimentManageFormState>(DeleteExperimentFormState);
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const result = await DeleteExperimentAction(state, id);

      setState(result);

      if (result.success) {
        setOpen(false);
      }
    });
  }
  return (
    <DialogConfirmAction
      variant="destructive"
      Icon={CircleAlert}
      title="Tem certeza que deseja excluir o experimento?"
      description="Essa ação não poderá ser revertida após confirmar."
      error={state.success ? '' : state.message}
      isPending={isPending}
      open={open}
      setOpen={setOpen}
      onConfirmAction={() => onSubmit()}
    />
  );
}
