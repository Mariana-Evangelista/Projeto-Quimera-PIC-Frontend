'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircleIcon } from 'lucide-react';
import { GlycemicControlResponseChart } from '@/features/experiment-charts';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';
import { useGlycemicControlChartSocket } from '../../hooks/use-glycemic-control-chart-socket';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

  return (
    <Card className="w-full sm:py-0">
      <CardHeader className="border-border flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Visão geral dos resultados do experimento</CardDescription>
        </div>
        <div className="flex sm:w-2/5">
          <div className="border-border flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-4 sm:py-6">
            <span className="text-muted-foreground text-xs">Respostas</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {data.kpis.totalResponses}
            </span>
          </div>
          <div className="border-border flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-4 sm:py-6">
            <span className="text-muted-foreground text-xs">Pontuação Média</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {data.kpis.averageScore}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="my-auto px-2 sm:p-4">
        <GlycemicControlResponseChart data={data.chart} />;
      </CardContent>
    </Card>
  );
}
