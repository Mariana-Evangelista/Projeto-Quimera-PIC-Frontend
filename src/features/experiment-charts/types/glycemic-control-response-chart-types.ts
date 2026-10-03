export interface GlycemicControlResponseChartTypes {
  chart: GlycemicControlChartTypes[];
  kpis: GlycemicControlKPIsTypes;
}

export interface GlycemicControlKPIsTypes {
  totalResponses: number;
  averageScore: number;
}

export interface GlycemicControlChartTypes {
  students: number;
  question: number;
}
