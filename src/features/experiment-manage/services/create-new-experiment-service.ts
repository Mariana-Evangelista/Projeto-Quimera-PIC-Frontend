import { api } from '@/lib/api';
import { ExperimentManageFormData } from '../schema/experiment-manage-schema';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function CreateNewExperimentService(
  experiment: ExperimentManageFormData
): Promise<ExperimentDataTypes> {
  const { data } = await api.post<ExperimentDataTypes, ExperimentManageFormData>(
    '/experiment/',
    experiment,
    { auth: 'authenticated' }
  );
  return data;
}
