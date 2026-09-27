import { useQuery } from '@tanstack/react-query';
import { GetGlycemicControlResponseChartService } from '../services/get-glycemic-control-response-chart-service';

export function useGetGlycemicControlResponseChart(pin: string) {
  return useQuery({
    queryKey: ['glycemic-control-response', pin],
    queryFn: () => GetGlycemicControlResponseChartService(pin),
    enabled: !!pin,
  });
}
