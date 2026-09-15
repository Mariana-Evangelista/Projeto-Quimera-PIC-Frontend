'use server';

import z from 'zod';
import {
  ExperimentAccessFormData,
  ExperimentAccessSchema,
} from '../schemas/experiment-access-schema';
import { ExperimentAccessFormState } from '../types/experiment-acces-form-state';
import { GetExperimentByPinService } from '../services/get-experiment-by-pin-service';
import { ApiError } from '@/lib/api/errors';
import { ExperimentAccessClaims, setExperimentAccessCookie } from '../services/set-data-cookies';
import { redirect } from 'next/navigation';

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

  const { pin, student, slug } = validatedData.data;

  try {
    const experiment = await GetExperimentByPinService(pin);
    const cookieData: ExperimentAccessClaims = {
      studentName: student,
      experiment,
    };
    await setExperimentAccessCookie(cookieData);
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

  redirect(`/experiment/${slug}/${pin}?start_experiment_room=false`);
  //fazer lógica que verifica o tipo de experimento que se está tentando acessar, enviar slug para api validar
}
