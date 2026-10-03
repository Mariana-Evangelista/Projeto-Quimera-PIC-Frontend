'use server';

import { api } from '@/lib/api';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function GetExperimentsByIdService(id: string): Promise<ExperimentDataTypes> {
  const { data } = await api.get<ExperimentDataTypes>(`/experiment/id/${id}`, {
    auth: 'authenticated',
    tags: [`experiment-${id}`],
  });

  return data;
}
