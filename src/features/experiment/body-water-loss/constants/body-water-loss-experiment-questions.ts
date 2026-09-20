import {
  BodyWaterLossAnswerTypes,
  BodyWaterLossQuestionTypes,
} from '../types/body-water-loss-question-types';

export const BODY_WATER_LOSS_EXPERIMENT_OPTIONS: Record<string, BodyWaterLossAnswerTypes[]> = {
  options_one: [
    { value: 'Hipotálamo', weight: 80 },
    { value: 'CRH', weight: 0 },
    { value: 'ACTH', weight: 0 },
    { value: 'Cortisol', weight: 0 },
    { value: 'Na+', weight: 0 },
  ],
  options_two: [
    { value: 'ADH', weight: 20 },
    { value: 'Paratormônio', weight: 0 },
    { value: 'T3 e T4', weight: 0 },
    { value: 'K+', weight: 0 },
    { value: 'Glicemia', weight: 0 },
  ],
} as const;

export const BODY_WATER_LOSS_EXPERIMENT_QUESTIONS: BodyWaterLossQuestionTypes[] = [
  {
    title: '1. Primeira Etapa',
    description:
      'Ao avaliar o paciente, você precisa identificar qual estrutura do sistema nervoso central é responsável por detectar a queda de água no organismo e desencadear o limiar da sede. Selecione a estrutura correta.',
    options: BODY_WATER_LOSS_EXPERIMENT_OPTIONS['options_one'],
  },
  {
    title: '2. Segunda Etapa',
    description:
      'Identificado o centro de controle, você deve agora reconhecer qual hormônio é liberado em resposta a esse estímulo, atuando nos rins para aumentar a reabsorção de água e ajudar a reverter a desidratação do paciente. Selecione o hormônio correto.',
    options: BODY_WATER_LOSS_EXPERIMENT_OPTIONS['options_two'],
  },
];
