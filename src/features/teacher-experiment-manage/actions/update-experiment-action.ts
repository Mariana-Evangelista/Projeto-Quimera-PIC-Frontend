'use server';

import z from 'zod';

import { ApiError } from '@/lib/api/errors/api-error';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';
import {
  ExperimentManageFormData,
  ExperimentManageSchema,
} from '../schema/experiment-manage-schema';
import { UpdateExperimentService } from '../services/update-experiment-service';
import { updateTag } from 'next/cache';
import { GetErrorMessage } from '@/utils/get-error-message';

export async function UpdateExperimentAction(
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

  const ExperimentData = {
    class: validatedData.data.class,
    university: validatedData.data.university,
    _id: validatedData.data._id,
  };

  try {
    await UpdateExperimentService(
      {
        class: ExperimentData.class,
        university: ExperimentData.university,
      },
      ExperimentData._id ?? ''
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        field_errors: undefined,
        message: GetErrorMessage(error),
        inputs: ExperimentData,
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message:
        'Não foi possível atualizar o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: ExperimentData,
    };
  }

  updateTag('experiments');
  return {
    success: true,
    field_errors: undefined,
    message: 'Experimento atualizado com sucesso',
    inputs: ExperimentData,
  };
}
