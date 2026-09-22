import { useQuery } from '@tanstack/react-query';
import { GetBodyWaterLossResponseChartService } from '../services/get-body-water-loss-response-chart';

export function useGetBodyWaterLossResponseChart(pin: string) {
  return useQuery({
    queryKey: ['body-water-loss-response', pin],
    queryFn: () => GetBodyWaterLossResponseChartService(pin),
    enabled: !!pin,
  });
}
