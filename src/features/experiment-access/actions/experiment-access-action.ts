'use server';

import z from 'zod';
import { ExperimentAccessSchema } from '../schemas/experiment-access-schema';
import { ExperimentAccessFormState } from '../types/experiment-acces-form-state';
import { redirect } from 'next/navigation';

export async function ExperimentAccessAction(
  slug: string,
  _prevState: ExperimentAccessFormState,
  formData: FormData
): Promise<ExperimentAccessFormState> {
  const data = {
    student: formData.get('student'),
    pin: formData.get('pin'),
  };

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

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (validatedData.data.pin === '000000') {
      throw new Error('API Error: Este PIN foi bloqueado pelo sistema externo.');
    }
  } catch (error) {
    return {
      success: false,
      field_errors: undefined,
      message: (error as Error).message,
      inputs: validatedData.data,
    };
  }

  redirect(`/experiment/${slug}/${validatedData.data.pin}?start_experiment_room=false`);
}
