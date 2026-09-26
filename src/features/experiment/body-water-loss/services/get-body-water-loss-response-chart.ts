'use server';

import { api } from '@/lib/api';
import { ApiError } from '@/lib/api/errors/api-error';
import { BodyWaterLossResponseChartTypes } from '../types/body-water-loss-response-chart-types';

export async function GetBodyWaterLossResponseChartService(
  pin: string
): Promise<BodyWaterLossResponseChartTypes[]> {
  try {
    const { data } = await api.get<BodyWaterLossResponseChartTypes[]>(
      `/body-water-loss-response/analytics/${pin}`,
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
