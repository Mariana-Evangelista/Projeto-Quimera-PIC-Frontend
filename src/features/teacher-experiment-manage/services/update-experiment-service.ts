import { api } from '@/lib/api';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { ExperimentUpdateTypes } from '../types/experiment-update-types';

export async function UpdateExperimentService(
  experiment: ExperimentUpdateTypes,
  id: string
): Promise<ExperimentDataTypes> {
  const { data } = await api.put<ExperimentDataTypes, ExperimentUpdateTypes>(
    `/experiment/${id}`,
    experiment,
    { auth: 'authenticated' }
  );
  return data;
}
