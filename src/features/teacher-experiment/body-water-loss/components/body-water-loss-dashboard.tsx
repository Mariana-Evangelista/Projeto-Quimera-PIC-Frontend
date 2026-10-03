import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { GetBodyWaterLossResponseChartService } from '@/features/experiment-charts/services/get-body-water-loss-response-chart-service';
import { BodyWaterLossResponseChartTypes } from '@/features/experiment-charts/types/body-water-loss-response-chart-types';
import { BodyWaterLossDashboardContent } from './body-water-loss-dashboard-content';

export async function BodyWaterLossDashboard({ experiment }: { experiment: ExperimentDataTypes }) {
  let initialState: BodyWaterLossResponseChartTypes;
  try {
    initialState = await GetBodyWaterLossResponseChartService(experiment.pin);
  } catch {
    initialState = {
      chart: [],
      kpis: {
        totalResponses: 0,
        averageScore: 0,
      },
    };
  }
  return <BodyWaterLossDashboardContent pin={experiment.pin} initialState={initialState} />;
}
