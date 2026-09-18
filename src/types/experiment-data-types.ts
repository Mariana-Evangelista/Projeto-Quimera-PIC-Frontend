import { ExperimentsMap } from '@/constants/experiments-map';

export interface ExperimentDataTypes {
  _id: string;
  pin: string;
  teacher: string;
  type: ExperimentsMap;
  university: string;
  class: string;
  liberateSend: boolean;
  liberateResult: boolean;
  responsesNumber: number;
  createdAt: Date;
}
