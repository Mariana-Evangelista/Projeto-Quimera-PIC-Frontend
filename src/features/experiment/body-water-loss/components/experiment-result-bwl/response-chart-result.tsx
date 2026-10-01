import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBodyWaterLossResponseChart } from '@/features/experiment-charts/hooks/use-get-body-water-loss-response-chart';
import { AlertCircleIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { BodyWaterLossResponseChart } from '@/features/experiment-charts';

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
        {!isLoading && data && <BodyWaterLossResponseChart data={data} />}
        {isLoading && <Skeleton className="h-64 md:h-80" />}
        {!data && isError && error && (
          <Alert variant="destructive" className="mb-4 text-start">
            <AlertCircleIcon className="mr-2 h-4 w-4" />

            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
