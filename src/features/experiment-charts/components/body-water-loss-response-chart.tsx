import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';
import { BodyWaterLossChartTypes } from '../types/body-water-loss-response-chart-types';

const chartConfig = {
  students: {
    label: 'Alunos',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function BodyWaterLossResponseChart({ data }: { data: BodyWaterLossChartTypes[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full md:h-80" data-testid="body-water-loss-chart">
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
  );
}
