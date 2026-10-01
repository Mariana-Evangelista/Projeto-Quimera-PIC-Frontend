'use server';

import { api } from '@/lib/api';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function GetTeacherExperimentsService(): Promise<ExperimentDataTypes[]> {
  const { data } = await api.get<ExperimentDataTypes[]>('/experiment/me', {
    auth: 'authenticated',
    tags: ['experiments'],
  });

  return data;
}
