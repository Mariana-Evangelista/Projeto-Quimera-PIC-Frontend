import { api } from '@/lib/api';
import { BodyWaterLossResponseTypes } from '../types/body-water-loss-response-types';

export async function CreateBodyWaterLossResponseService(
  experimentData: BodyWaterLossResponseTypes
): Promise<BodyWaterLossResponseTypes> {
  const { data } = await api.post<BodyWaterLossResponseTypes, BodyWaterLossResponseTypes>(
    '/body-water-loss-response/',
    experimentData,
    {
      auth: 'public',
    }
  );

  return data;
}
