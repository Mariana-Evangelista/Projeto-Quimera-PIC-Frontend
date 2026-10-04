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

type SwitchRule = { checked: boolean; disabled: boolean };

const SWITCH_RULES: Record<ExperimentStatus, { send: SwitchRule; results: SwitchRule }> = {
  'Não iniciado': {
    send: { checked: false, disabled: false },
    results: { checked: false, disabled: true },
  },
  'Em Progresso': {
    send: { checked: true, disabled: false },
    results: { checked: false, disabled: false },
  },
  Finalizado: {
    send: { checked: true, disabled: true },
    results: { checked: true, disabled: true },
  },
};

interface ExperimentSettingsFormProps {
  experimentId: string;
  status: ExperimentStatus;
}

export function ExperimentSettingsForm({ experimentId, status }: ExperimentSettingsFormProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [state, formAction, isPending] = useActionState<ExperimentSettingsStateTypes, FormData>(
    updateExperimentSettings.bind(null, experimentId),
    {
      allowSubmissions: status !== 'Não iniciado',
      shareResults: status === 'Finalizado',
    }
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

  const currentStatus: ExperimentStatus = settings.shareResults
    ? 'Finalizado'
    : settings.allowSubmissions
      ? 'Em Progresso'
      : 'Não iniciado';

  const { send, results } = SWITCH_RULES[currentStatus];
  const sendDisabled = send.disabled || isPending;
  const resultsDisabled = results.disabled || isPending;

  return (
    <>
      <FieldGroup className="flex w-full flex-col sm:flex-row lg:flex-col">
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
              checked={send.checked}
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
              checked={results.checked}
              disabled={resultsDisabled}
              onCheckedChange={(checked) => checked && setConfirmOpen(true)}
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
        onConfirmAction={() => {
          change({ allowSubmissions: false, shareResults: true });
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
