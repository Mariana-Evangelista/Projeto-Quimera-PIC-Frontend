'use server';

import { ApiError } from '@/lib/api/errors/api-error';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';

import { DeleteExperimentsService } from '../services/delete-experiment-service';
import { updateTag } from 'next/cache';
import { GetErrorMessage } from '@/utils/get-error-message';

export async function DeleteExperimentAction(
  _prevState: ExperimentManageFormState,
  id: string
): Promise<ExperimentManageFormState> {
  try {
    await DeleteExperimentsService(id);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        field_errors: undefined,
        message: GetErrorMessage(error),
        inputs: undefined,
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message:
        'Não foi possível excluir o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: undefined,
    };
  }

  updateTag('experiments');

  return {
    success: true,
    field_errors: undefined,
    message: 'Experimento excluído com sucesso',
    inputs: undefined,
  };
}
