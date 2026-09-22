'use server';

import z from 'zod';

import { ApiError } from '@/lib/api/errors';
import {
  BodyWaterLoosResponseFormData,
  BodyWaterLossResponseSchema,
} from '../schemas/create-body-water-loss-response-schema';
import { BodyWaterLossResponseFormState } from '../types/body-water-loss-response-state';
import { getSignedCookieAccess } from '@/utils/get-signed-cookies';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from '@/features/experiment-access/services/set-data-cookies';
import { BodyWaterLossResponseTypes } from '../types/body-water-loss-response-types';
import { CreateBodyWaterLossResponseService } from '../services/create-body-water-loss-response-service';

export async function BodyWaterLossResponseAction(
  _prevState: BodyWaterLossResponseFormState,
  data: BodyWaterLoosResponseFormData
): Promise<BodyWaterLossResponseFormState> {
  const validatedData = BodyWaterLossResponseSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      field_errors: z.flattenError(validatedData.error).fieldErrors,
      message: 'Erro de validação',
      inputs: {
        option_1: data.option_1,
        option_2: data.option_2,
      },
    };
  }

  const { option_1, option_2 } = validatedData.data;

  try {
    const experimentData = await getSignedCookieAccess<ExperimentAccessClaims>(
      EXPERIMENT_ACCESS_COOKIE,
      'EXPERIMENT_ACCESS_SECRET'
    );

    if (!experimentData) {
      return {
        success: false,
        field_errors: undefined,
        message: 'Sessão do experimento expirada ou inválida. Entre com o PIN novamente.',
        inputs: { option_1, option_2 },
      };
    }

    const responseBody: BodyWaterLossResponseTypes = {
      studentName: experimentData.studentName,
      pin: experimentData.pin,
      answerOne: option_1,
      answerTwo: option_2,
    };

    const response = await CreateBodyWaterLossResponseService(responseBody);

    return {
      success: true,
      field_errors: undefined,
      message: JSON.stringify(response?.score),
      inputs: { option_1, option_2 },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        field_errors: undefined,
        message: error.error.message,
        inputs: { option_1, option_2 },
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message:
        'Não foi possível validar o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: { option_1, option_2 },
    };
  }
}
