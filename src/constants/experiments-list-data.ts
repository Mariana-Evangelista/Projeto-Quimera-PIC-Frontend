import { ExperimentTypes } from '@/types/experiment-types';
import { FlaskConical, GlassWater } from 'lucide-react';

export const EXPERIMENTS_LIST_DATA: ExperimentTypes[] = [
  {
    slug: 'body-water-loss',
    title: 'Queda de Água Corporal',
    description:
      'Explore como a perda de água afeta o organismo dos animais e entenda os mecanismos fisiológicos envolvidos na manutenção do equilíbrio hídrico.',
    Icon: GlassWater,
  },
  {
    slug: 'glycemic-control',
    title: 'Controle Glicêmico',
    description:
      'Descubra como os hormônios atuam na regulação da glicose sanguínea e compreenda os processos envolvidos no diagnóstico do Diabetes Mellitus.',
    Icon: FlaskConical,
  },
];
