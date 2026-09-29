'use server';

import z from 'zod';

import { ApiError } from '@/lib/api/errors/api-error';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';
import {
  ExperimentManageFormData,
  ExperimentManageSchema,
} from '../schema/experiment-manage-schema';
import { CreateNewExperimentService } from '../services/create-new-experiment-service';

export async function CreateNewExperimentAction(
  _prevState: ExperimentManageFormState,
  data: ExperimentManageFormData
): Promise<ExperimentManageFormState> {
  const validatedData = ExperimentManageSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      field_errors: z.flattenError(validatedData.error).fieldErrors,
      message: undefined,
      inputs: data,
    };
  }

  const ExperimentData = validatedData.data;

  try {
    await CreateNewExperimentService(ExperimentData);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        field_errors: undefined,
        message: error.error.message,
        inputs: ExperimentData,
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message:
        'Não foi possível criar o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: ExperimentData,
    };
  }
  return {
    success: true,
    field_errors: undefined,
    message: 'Experimento criado com sucesso',
    inputs: ExperimentData,
  };
}
