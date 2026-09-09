import { BodyWaterLossOptionsTypes } from '../types/answer-options-types';

export const BODY_WATER_LOSS_EXPERIMENT_OPTIONS: BodyWaterLossOptionsTypes = {
  options_one: [
    { value: 'hipotalamo', label: 'Hipotálamo', weight: 80 },
    { value: 'crh', label: 'CRH', weight: 0 },
    { value: 'acth', label: 'ACTH', weight: 0 },
    { value: 'cortisol', label: 'Cortisol', weight: 0 },
    { value: 'na+', label: 'Na+', weight: 0 },
  ],
  options_two: [
    { value: 'adh', label: 'ADH', weight: 20 },
    { value: 'paratormônio', label: 'Paratormônio', weight: 0 },
    { value: 't3-e-t4', label: 'T3 e T4', weight: 0 },
    { value: 'k+', label: 'K+', weight: 0 },
    { value: 'glicemia', label: 'Glicemia', weight: 0 },
  ],
};
