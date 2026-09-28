import { api } from '@/lib/api';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function UpdateExperimentService(
  experiment: ExperimentDataTypes
): Promise<ExperimentDataTypes> {
  const { data } = await api.put<ExperimentDataTypes, ExperimentDataTypes>(
    `/experiment/${experiment._id}`,
    experiment,
    { auth: 'authenticated' }
  );
  return data;
}
