import { ExperimentsMap } from '@/constants/experiments-map';

export type ExperimentStatus = 'Não iniciado' | 'Em progresso' | 'Finalizado';

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
  status: ExperimentStatus;
}
