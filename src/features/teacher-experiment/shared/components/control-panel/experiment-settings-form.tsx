'use client';

import { startTransition, useActionState, useOptimistic, useState } from 'react';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { ExperimentSettingsStateTypes } from '../../types/experiment-settings-state-types';
import { updateExperimentSettings } from '../../actions/update-experiment-settings-action';
import { DialogConfirmAction } from '@/components/dialog-confirm-action';
import { ExperimentStatus } from '@/types/experiment-data-types';

interface ExperimentSettingsFormProps {
  experimentId: string;
  status: ExperimentStatus;
}

function settingsFromStatus(status: ExperimentStatus): ExperimentSettingsStateTypes {
  return {
    allowSubmissions: status !== 'Não iniciado',
    shareResults: status === 'Finalizado',
  };
}

function statusFromSettings(settings: ExperimentSettingsStateTypes): ExperimentStatus {
  if (settings.shareResults) return 'Finalizado';
  if (settings.allowSubmissions) return 'Em progresso';
  return 'Não iniciado';
}

export function ExperimentSettingsForm({ experimentId, status }: ExperimentSettingsFormProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [state, formAction, isPending] = useActionState<ExperimentSettingsStateTypes, FormData>(
    updateExperimentSettings.bind(null, experimentId),
    settingsFromStatus(status)
  );

  const [settings, setOptimistic] = useOptimistic(state);

  function change(next: { allowSubmissions: boolean; shareResults: boolean }) {
    const formData = new FormData();
    if (next.allowSubmissions) formData.set('allowSubmissions', 'on');
    if (next.shareResults) formData.set('shareResults', 'on');

    startTransition(() => {
      setOptimistic(next);
      formAction(formData);
    });
  }

  function handleConfirmClose() {
    change({ allowSubmissions: false, shareResults: true });
    setConfirmOpen(false);
  }

  const currentStatus = statusFromSettings(settings);
  const isNotStarted = currentStatus === 'Não iniciado';
  const isInProgress = currentStatus === 'Em progresso';
  const isFinished = currentStatus === 'Finalizado';

  const sendChecked = !isNotStarted;

  const sendDisabled = isFinished || isPending;

  const resultsChecked = isFinished;

  const resultsDisabled = !isInProgress || isPending;

  return (
    <>
      <FieldGroup className="w-full max-w-sm">
        <FieldLabel htmlFor="liberate-send-response" className="border-border">
          <Field orientation="horizontal" data-disabled={sendDisabled}>
            <FieldContent>
              <FieldTitle>Permitir Envio de Respostas</FieldTitle>
              <FieldDescription>
                Liberar a sala de experimento para que os alunos possam enviar suas respostas.
              </FieldDescription>
            </FieldContent>
            <Switch
              className="cursor-pointer"
              id="liberate-send-response"
              checked={sendChecked}
              disabled={sendDisabled}
              onCheckedChange={(checked) =>
                change({ allowSubmissions: checked, shareResults: false })
              }
            />
          </Field>
        </FieldLabel>

        <FieldLabel htmlFor="liberate-results" className="border-border">
          <Field orientation="horizontal" data-disabled={resultsDisabled}>
            <FieldContent>
              <FieldTitle>Compartilhar Resultados</FieldTitle>
              <FieldDescription>
                Liberar os resultados e gráficos do experimento para que os alunos possam
                visualizá-los.
              </FieldDescription>
            </FieldContent>
            <Switch
              className="cursor-pointer"
              id="liberate-results"
              checked={resultsChecked}
              disabled={resultsDisabled}
              onCheckedChange={(checked) => {
                if (checked) setConfirmOpen(true);
              }}
            />
          </Field>
        </FieldLabel>

        {state.error && (
          <p role="alert" className="text-destructive text-sm">
            {state.error}
          </p>
        )}
      </FieldGroup>

      <DialogConfirmAction
        variant="success"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        isPending={isPending}
        title="Liberar Resultados?"
        description="Ao compartilhar os resultados, o envio de respostas será encerrado e os alunos não poderão mais responder. Esta ação não pode ser desfeita."
        onConfirmAction={handleConfirmClose}
      />
    </>
  );
}
