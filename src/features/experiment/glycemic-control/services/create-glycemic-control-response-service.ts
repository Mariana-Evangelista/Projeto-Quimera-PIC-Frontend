import { api } from '@/lib/api';
import { GlycemicControlResponseTypes } from '../types/glycemic-control-response-types';

export async function CreateGlycemicControlResponseService(
  experimentData: GlycemicControlResponseTypes
): Promise<GlycemicControlResponseTypes> {
  const { data } = await api.post<GlycemicControlResponseTypes, GlycemicControlResponseTypes>(
    '/glycemic-control-response/',
    experimentData,
    {
      auth: 'public',
    }
  );

  return data;
}