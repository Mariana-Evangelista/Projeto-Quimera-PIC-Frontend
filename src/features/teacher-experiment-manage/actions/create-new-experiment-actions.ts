'use server';

import z from 'zod';

import { ApiError } from '@/lib/api/errors/api-error';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';
import {
  ExperimentManageFormData,
  ExperimentManageSchema,
} from '../schema/experiment-manage-schema';
import { CreateNewExperimentService } from '../services/create-new-experiment-service';
import { updateTag } from 'next/cache';
import { GetErrorMessage } from '@/utils/get-error-message';

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

  let experimentResponse;

  try {
    const experiment = await CreateNewExperimentService(ExperimentData);
    experimentResponse = experiment;
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
        'Não foi possível criar o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: ExperimentData,
    };
  }

  updateTag('experiments');
  return {
    success: true,
    field_errors: undefined,
    message: 'Experimento criado com sucesso',
    inputs: {
      type: experimentResponse.type,
      university: experimentResponse.university,
      class: experimentResponse.class,
      _id: experimentResponse._id,
    },
  };
}
