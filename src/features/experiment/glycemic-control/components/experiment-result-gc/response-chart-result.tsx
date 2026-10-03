import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircleIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useGetGlycemicControlResponseChart } from '@/features/experiment-charts/hooks/use-get-glycemic-control-response-chart';
import { GlycemicControlResponseChart } from '@/features/experiment-charts';

export function ResponseChartResult() {
  const params = useParams<{ pin: string }>();
  const { data, isLoading, isError, error } = useGetGlycemicControlResponseChart(params.pin);
  return (
    <Card className="border-none shadow-none ring-0">
      <CardHeader className="p-0">
        <CardTitle>Desempenho da Turma por Questão</CardTitle>
        <CardDescription>
          Quantidade de alunos que responderam corretamente cada uma das 5 questões.
        </CardDescription>
      </CardHeader>
      <CardContent className="sm:py-8">
        {!isLoading && data && <GlycemicControlResponseChart data={data.chart} />}
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
