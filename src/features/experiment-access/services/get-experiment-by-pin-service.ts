import { api } from '@/lib/api';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export async function GetExperimentByPinService(
  pin: string,
  slug: string
): Promise<ExperimentDataTypes> {
  const { data } = await api.get<ExperimentDataTypes>(`/experiment/pin/${pin}/${slug}`, {
    auth: 'public',
  });
  return data;
}
