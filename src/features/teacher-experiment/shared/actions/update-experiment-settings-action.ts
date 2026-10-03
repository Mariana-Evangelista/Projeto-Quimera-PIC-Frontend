'use server';

import { ExperimentSettingsStateTypes } from '../types/experiment-settings-state-types';
import { UpdateExperimentService } from '@/features/teacher-experiment-manage/services/update-experiment-service';
import { ApiError } from '@/lib/api/errors/api-error';
import { updateTag } from 'next/cache';

export async function updateExperimentSettings(
  experimentId: string,
  prev: ExperimentSettingsStateTypes,
  formData: FormData
): Promise<ExperimentSettingsStateTypes> {
  if (prev.shareResults) {
    return { ...prev, error: 'O experimento foi encerrado e não pode ser alterado.' };
  }

  const shareResults = formData.get('shareResults') !== null;
  let allowSubmissions = formData.get('allowSubmissions') !== null;

  if (shareResults) allowSubmissions = false;

  if (shareResults && !prev.allowSubmissions) {
    return { ...prev, error: 'Libere o envio de respostas antes de compartilhar os resultados.' };
  }

  const settingsData = {
    _id: experimentId,
    liberateSend: allowSubmissions,
    liberateResult: shareResults,
  };

  try {
    await UpdateExperimentService(
      {
        liberateSend: settingsData.liberateSend,
        liberateResult: settingsData.liberateResult,
      },
      settingsData._id ?? ''
    );

    updateTag(`experiment-${experimentId}`);

    return { allowSubmissions, shareResults };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ...prev, error: error.error.message };
    }

    return { ...prev, error: 'Não foi possível salvar as configurações.' };
  }
}
