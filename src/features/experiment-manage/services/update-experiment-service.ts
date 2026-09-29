import { api } from '@/lib/api';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function UpdateExperimentService(
  experiment: Partial<ExperimentDataTypes>
): Promise<ExperimentDataTypes> {
  const { data } = await api.put<ExperimentDataTypes, Partial<ExperimentDataTypes>>(
    `/experiment/${experiment._id}`,
    experiment,
    { auth: 'authenticated' }
  );
  return data;
}
