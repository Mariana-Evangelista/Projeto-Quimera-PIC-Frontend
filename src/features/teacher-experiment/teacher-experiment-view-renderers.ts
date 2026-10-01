import { ExperimentsMap } from '@/constants/experiments-map';
import { ComponentType } from 'react';
import { TeacherBodyWaterLossView } from './body-water-loss';
import { TeacherGlycemicControlView } from './glycemic-control';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export const TEACHER_EXPERIMENT_RENDERERS = {
  'body-water-loss': TeacherBodyWaterLossView,
  'glycemic-control': TeacherGlycemicControlView,
} satisfies Record<ExperimentsMap, ComponentType<{ experiment: ExperimentDataTypes }>>;
