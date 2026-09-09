import { QuestionTypes } from '../types/question-types';

export const GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS: QuestionTypes[] = [
  {
    title: 'Questão 1',
    description:
      'As dosagens glicêmicas de Pipoca superam repetidamente 280 mg/dL, mesmo com uma alimentação de boa qualidade. Do ponto de vista fisiológico, o que esse achado sugere sobre o eixo insulina-glucagon do animal?',
    answer: 'b',
    options: [
      {
        value: 'a',
        label: 'Excesso de produção de glucagon isolado, sem relação com a insulina',
      },
      {
        value: 'b',
        label:
          'Falha na ação ou na liberação de insulina, permitindo que o efeito hiperglicemiante do glucagon predomine',
      },
      {
        value: 'c',
        label: 'Hipersecreção fisiológica normal de insulina compensada pelo glucagon',
      },
      {
        value: 'd',
        label:
          'Ausência completa de secreção hormonal pancreática, tanto de insulina quanto de glucagon',
      },
    ],
  },
  {
    title: 'Questão 2',
    description:
      'Manuel pergunta por que, mesmo em jejum, a glicemia de Pipoca continua elevada, diferente do que ocorreria em um cão saudável. Qual é a explicação mais adequada?',
    answer: 'b',
    options: [
      {
        value: 'a',
        label:
          'Em jejum, o glucagon deveria reduzir ainda mais a glicemia, o que não ocorre em Pipoca',
      },
      {
        value: 'b',
        label:
          'Em um animal saudável, a queda de insulina durante o jejum permite que o glucagon eleve a glicemia de forma controlada; em Pipoca, a deficiência de insulina já mantém a glicemia alta independentemente do jejum',
      },
      {
        value: 'c',
        label:
          'O jejum estimula diretamente a insulina a normalizar a glicemia em qualquer condição clínica',
      },
      {
        value: 'd',
        label:
          'A glicemia em jejum depende exclusivamente da adrenalina, não da insulina ou do glucagon',
      },
    ],
  },
  {
    title: 'Questão 3 ',
    description:
      'Manuel relata que Pipoca ficou muito agitado durante um susto no parque, e a glicemia medida logo em seguida estava elevada. Qual hormônio está mais associado a esse pico rápido e pontual de glicose observado em situações de estresse agudo?',
    answer: 'c',
    options: [
      { value: 'a', label: 'Cortisol' },
      { value: 'b', label: 'Insulina' },
      { value: 'c', label: 'Adrenalina' },
      { value: 'd', label: 'Glucagon' },
    ],
  },
  {
    title: 'Questão 4',
    description:
      'Você orienta Manuel sobre os cuidados com Pipoca. Qual das recomendações abaixo está mais alinhada com o controle da glicemia em um cão diabético?',
    answer: 'c',
    options: [
      {
        value: 'a',
        label:
          'Aumentar a oferta de rações rica em carboidratos simples para fornecer mais energia',
      },
      {
        value: 'b',
        label: 'Estimular exercícios físicos extenuantes diariamente sem controle glicêmico prévio',
      },
      {
        value: 'c',
        label:
          'Orientar sobre alimentação balanceada, monitorar o nível de estresse do animal e ajustar a atividade física de forma controlada',
      },
      {
        value: 'd',
        label: 'Suspender toda atividade física e restringir a alimentação por completo',
      },
    ],
  },
  {
    title: 'Questão 5 ',
    description:
      'Considerando o quadro crônico de Pipoca e a necessidade de acompanhamento indefinido, qual estratégia terapêutica é mais coerente com a fisiologia hormonal descrita no caso?',
    answer: 'a',
    options: [
      {
        value: 'a',
        label:
          'Administrar insulina exógena associada a um plano alimentar controlado em carboidratos, com monitoramento glicêmico periódico',
      },
      {
        value: 'b',
        label: 'Administrar glucagon exógeno para complementar a ação da insulina endógena',
      },
      {
        value: 'c',
        label: 'Utilizar corticosteroides para estabilizar a glicemia a longo prazo',
      },
      {
        value: 'd',
        label: 'Não realizar nenhuma intervenção hormonal, apenas reduzir o volume de ração',
      },
    ],
  },
];
