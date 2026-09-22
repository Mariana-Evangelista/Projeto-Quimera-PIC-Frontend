import { useParams } from 'next/navigation';
import { useGetBodyWaterLossResponseChart } from '../hooks/use-get-body-water-loss-response-chart';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

const chartConfig = {
  students: {
    label: 'Alunos',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function BodyWaterLossResponseChart() {
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
        {!isLoading && data && (
          <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full md:h-80">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{ top: 24, left: 12, right: 12, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="score"
                tickLine={false}
                axisLine={false}
                tickMargin={16}
                minTickGap={32}
                padding={{ left: 20, right: 20 }}
                tickFormatter={(value) => {
                  return `${value} pontos`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(_, payload) => {
                      return payload?.[0]?.payload?.label;
                    }}
                  />
                }
              />
              <Line
                dataKey="students"
                type="monotone"
                stroke="var(--color-students)"
                strokeWidth={2}
                dot={{ r: 5, fill: 'var(--color-students)' }}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
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
