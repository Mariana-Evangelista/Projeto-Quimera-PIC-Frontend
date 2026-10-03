'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircleIcon } from 'lucide-react';
import { BodyWaterLossResponseChart } from '@/features/experiment-charts';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';
import { useBodyWaterLossChartSocket } from '../hooks/use-body-water-loss-chart-socket';

export function BodyWaterLossDashboardContent({
  pin,
  initialState,
}: {
  pin: string;
  initialState: BodyWaterLossResponseChartTypes[];
}) {
  const { data, error } = useBodyWaterLossChartSocket(pin, initialState);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircleIcon className="mr-2 h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (data.length === 0) {
    return <Skeleton className="h-64 md:h-80" />;
  }

  return <BodyWaterLossResponseChart data={data} />;
}