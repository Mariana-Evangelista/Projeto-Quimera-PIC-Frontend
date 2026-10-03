'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircleIcon } from 'lucide-react';
import { GlycemicControlResponseChart } from '@/features/experiment-charts';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';
import { useGlycemicControlChartSocket } from '../hooks/use-glycemic-control-chart-socket';

export function GlycemicControlDashboardContent({
  pin,
  initialState,
}: {
  pin: string;
  initialState: GlycemicControlResponseChartTypes;
}) {
  const { data, error } = useGlycemicControlChartSocket(pin, initialState);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircleIcon className="mr-2 h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return <Skeleton className="h-64 md:h-80" />;
  }

  return <GlycemicControlResponseChart data={data.chart} />;
}
