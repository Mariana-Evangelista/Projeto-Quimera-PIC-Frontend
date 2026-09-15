'use server';

import z from 'zod';
import {
  ExperimentAccessFormData,
  ExperimentAccessSchema,
} from '../schemas/experiment-access-schema';
import { ExperimentAccessFormState } from '../types/experiment-acces-form-state';
import { GetExperimentByPinService } from '../services/get-experiment-by-pin-service';
import { ApiError } from '@/lib/api/errors';

export async function ExperimentAccessAction(
  _prevState: ExperimentAccessFormState,
  data: ExperimentAccessFormData
): Promise<ExperimentAccessFormState> {
  const validatedData = ExperimentAccessSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      field_errors: z.flattenError(validatedData.error).fieldErrors,
      message: undefined,
      inputs: {
        student: String(data.student ?? ''),
        pin: String(data.pin ?? ''),
      },
    };
  }

  const { pin, student } = validatedData.data;

  try {
    const experiment = await GetExperimentByPinService(pin);

    console.log(experiment);

    return {
      success: true,
      field_errors: undefined,
      message: 'Sucesso na solicitação!',
      inputs: { pin, student },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        field_errors: undefined,
        message: error.error.message,
        inputs: { pin, student },
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message:
        'Não foi possível validar o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: { pin, student },
    };
  }

  // redirect(`/experiment/${slug}/${validatedData.data.pin}?start_experiment_room=false`);
}
