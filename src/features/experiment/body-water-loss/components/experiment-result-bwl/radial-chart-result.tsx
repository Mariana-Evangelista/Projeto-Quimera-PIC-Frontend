import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { BadgeCheck, CheckCircle2, CircleX, MessageCircleWarning } from 'lucide-react';
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

export function RadialChartResult({ score }: { score: string }) {
  const scoreData = {
    '0': {
      label: 'Não foi dessa vez.',
      description:
        'Você não conseguiu aplicar o tratamento correto ao paciente e ele teve complicações. Estude mais para ter sucesso nos próximos atendimentos.',
      color: 'var(--color-red-500)',
      icon: <CircleX />,
    },
    '20': {
      label: 'Não foi dessa vez.',
      description:
        'Seu tratamento atingiu somento 20% de eficácia. Estude mais para ter sucesso nos próximos atendimentos.',
      color: 'var(--color-orange-500)',
      icon: <MessageCircleWarning />,
    },
    '80': {
      label: 'Muito bom',
      description:
        'Seu tratamento atingiu 80% de eficácia. É um bom desempenho, busque melhorar ainda mais nos próximos atendimentos.',
      color: 'var(--color-blue-500)',
      icon: <CheckCircle2 />,
    },
    '100': {
      label: 'Excelente',
      description:
        'Seu tratamento atingiu 100% de eficácia e seu paciente está bem. Continue assim nos próximos atendimentos.',
      color: 'var(--color-green-500)',
      icon: <BadgeCheck />,
    },
  };

  const scoreKey = score as keyof typeof scoreData;
  const currentScore = scoreData[scoreKey];

  const chartData = [{ score: Number(score), fill: 'var(--color-score)' }];

  const chartConfig = {
    score: {
      label: 'Pontos',
      color: currentScore.color,
    },
  } satisfies ChartConfig;
  return (
    <div className="grid w-full grid-rows-3 md:grid-cols-2 md:grid-rows-1">
      <ChartContainer
        config={chartConfig}
        className="row-span-2 aspect-square max-h-62.5 w-full md:order-2 md:pl-8"
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius={80}
          outerRadius={90}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
            axisLine={false}
          />

          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[90, 80]}
          />
          <RadialBar dataKey="score" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {chartData[0].score.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        / 100 Pontos
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>

      <div className="h-fit w-full md:order-1 md:my-auto">
        <Alert className="border-border" style={{ color: currentScore.color }}>
          {currentScore.icon}
          <AlertTitle>{currentScore.label}</AlertTitle>
          <AlertDescription>{currentScore.description}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
