'use server';

import { api } from '@/lib/api';
import { ApiError } from '@/lib/api/errors';
import { GlycemicControlResponseChartTypes } from '../types/glycemic-control-response-chart-types';

export async function GetGlycemicControlResponseChartService(
  pin: string
): Promise<GlycemicControlResponseChartTypes[]> {
  try {
    const { data } = await api.get<GlycemicControlResponseChartTypes[]>(
      `/glycemic-control-response/analytics/${pin}`,
      { auth: 'public' }
    );

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.error.message);
    }

    throw new Error('Erro ao buscar dados do experimento');
  }
}