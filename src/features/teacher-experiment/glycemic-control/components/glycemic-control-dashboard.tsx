import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { GetGlycemicControlResponseChartService } from '@/features/experiment-charts/services/get-glycemic-control-response-chart-service';
import { GlycemicControlResponseChartTypes } from '@/features/experiment-charts/types/glycemic-control-response-chart-types';
import { GlycemicControlDashboardContent } from './glycemic-control-dashboard-content';

export async function GlycemicControlDashboard({
  experiment,
}: {
  experiment: ExperimentDataTypes;
}) {
  let initialState: GlycemicControlResponseChartTypes;
  try {
    initialState = await GetGlycemicControlResponseChartService(experiment.pin);
  } catch {
    initialState = {
      chart: [],
      kpis: {
        totalResponses: 0,
        averageScore: 0,
      },
    };
  }
  return <GlycemicControlDashboardContent pin={experiment.pin} initialState={initialState} />;
}
