import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBodyWaterLossResponseChart } from '@/features/experiment-charts/hooks/use-get-body-water-loss-response-chart';
import { useParams } from 'next/navigation';
import { BodyWaterLossResponseChart } from '@/features/experiment-charts';
import { ExperimentErrorRoom } from '@/features/experiment/shared/components/experiment-error-room';

export function ResponseChartResult() {
  const params = useParams<{ pin: string }>();
  const { data, isLoading, isError, error } = useGetBodyWaterLossResponseChart(params.pin);
  return (
    <Card className="border-none shadow-none ring-0">
      <CardHeader className="p-0">
        <CardTitle>Distribuição da Pontuação dos Alunos</CardTitle>
        <CardDescription>
          Quantidade de alunos por faixa de pontuação, considerando os dois exercícios propostos.
        </CardDescription>
      </CardHeader>
      <CardContent className="sm:py-8">
        {!isLoading && data && <BodyWaterLossResponseChart data={data.chart} />}
        {isLoading && <Skeleton className="h-64 md:h-80" />}
        {!data && isError && error && (
          <div className="border-border flex h-64 items-center justify-center rounded-lg border md:h-80">
            <ExperimentErrorRoom message={error.message} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
