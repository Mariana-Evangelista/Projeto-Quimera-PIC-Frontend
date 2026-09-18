import { ExperimentsMap } from '@/constants/experiments-map';
import { ComponentType } from 'react';
import { BodyWaterLoss } from './body-water-loss';
import { GlycemicControl } from './glycemic-control';
import { StartExperimentRoomType } from '@/app/experiment/[slug]/[pin]/page';

export const EXPERIMENT_RENDERERS = {
  'body-water-loss': BodyWaterLoss,
  'glycemic-control': GlycemicControl,
} satisfies Record<ExperimentsMap, ComponentType<StartExperimentRoomType>>;
