'use server';

import { api } from '@/lib/api';
import { ApiError } from '@/lib/api/errors/api-error';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function GetTeacherExperimentsService(): Promise<ExperimentDataTypes[]> {
  try {
    const { data } = await api.get<ExperimentDataTypes[]>('/experiment/me', {
      auth: 'authenticated',
    });

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.error.message);
    }

    throw new Error('Erro ao buscar dados do experimento');
  }
}
