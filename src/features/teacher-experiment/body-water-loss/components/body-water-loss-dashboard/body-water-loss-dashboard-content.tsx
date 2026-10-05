'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { BodyWaterLossResponseChart } from '@/features/experiment-charts';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';
import { useBodyWaterLossChartSocket } from '../../hooks/use-body-water-loss-chart-socket';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocketErrorRoom } from '@/components/socket-error-room';

export function BodyWaterLossDashboardContent({
  pin,
  initialState,
}: {
  pin: string;
  initialState: BodyWaterLossResponseChartTypes;
}) {
  const { data, error, isConnected, reconnect } = useBodyWaterLossChartSocket(pin, initialState);

  if (error && !isConnected) {
    return (
      <Card className="flex w-full items-center justify-center sm:py-0">
        <SocketErrorRoom message={error} onReconnect={reconnect} />
      </Card>
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
        <BodyWaterLossResponseChart data={data.chart} />
      </CardContent>
    </Card>
  );
}
