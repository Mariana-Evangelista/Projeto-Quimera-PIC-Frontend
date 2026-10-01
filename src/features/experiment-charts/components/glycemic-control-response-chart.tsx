import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';
import { GlycemicControlResponseChartTypes } from '../types/glycemic-control-response-chart-types';

const chartConfig = {
  students: {
    label: 'Alunos',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function GlycemicControlResponseChart({
  data,
}: {
  data: GlycemicControlResponseChartTypes[];
}) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full md:h-80">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ top: 24, left: 12, right: 12, bottom: 8 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="question"
          tickLine={false}
          axisLine={false}
          tickMargin={16}
          minTickGap={32}
          padding={{ left: 20, right: 20 }}
          tickFormatter={(value) => {
            return `Q${value}`;
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
