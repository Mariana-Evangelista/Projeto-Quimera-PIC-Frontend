export interface BodyWaterLossResponseChartTypes {
  chart: BodyWaterLossChartTypes[];
  kpis: BodyWaterLossKPIsTypes;
}
export interface BodyWaterLossKPIsTypes {
  totalResponses: number;
  averageScore: number;
}

export interface BodyWaterLossChartTypes {
  students: number;
  score: number;
  label: string;
}
