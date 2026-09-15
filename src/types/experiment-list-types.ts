import { ExperimentsMap } from '@/constants/experiments-map';
import { LucideIcon } from 'lucide-react';

export interface ExperimentListTypes {
  slug: ExperimentsMap;
  title: string;
  description: string;
  Icon: LucideIcon;
}
