import { GetExperiment } from '@/utils/get-experiment';
import { ExperimentDefaultDataTypes } from '../../shared/types/experiment-default-data-types';
import { MakdownReadContent } from '../../shared/utils/markdown-read-content';
import CatIlustration from '../assets/CatIlustration.png';
import GraphGlycemicVariation from '../assets/GraphGlycemicVariation.png';
import SickDog from '../assets/SickDog.jpg';

export const GLYCEMIC_CONTROL_DEFAULT_DATA: ExperimentDefaultDataTypes = {
  header: {
    data: GetExperiment('glycemic-control'),
    imageSrc: CatIlustration,
    imageAlt: 'Imagem de um gato dormindo tranquilamente.',
  },
  content: [
    {
      id: 1,
      title: 'Introdução',
      description:
        'Compreenda os mecanismos hormonais de controle glicêmico e seus limiares de regulação.',
      markdown: MakdownReadContent(
        'src/features/experiment/glycemic-control/content/content-introduction-gc.md'
      ),
      imgSrc: GraphGlycemicVariation,
      imgAlt:
        'Gráfico representando a variação glicêmica ao longo do tempo antes e após a alimentação.',
    },
    {
      id: 2,
      title: 'Caso Clínico',
      description:
        'Analise um caso clínico real e aplique os conceitos de glicemia e Diabetes Mellitus.',
      markdown: MakdownReadContent(
        'src/features/experiment/glycemic-control/content/content-clinic-case-gc.md'
      ),
      imgSrc: SickDog,
      imgAlt: 'Imagem de um cachorro doente deitado, com expressão triste.',
    },
  ],
};
