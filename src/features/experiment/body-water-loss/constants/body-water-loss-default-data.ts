import { GetExperiment } from '@/utils/get-experiment';
import { ExperimentDefaultDataTypes } from '../../shared/types/experiment-default-data-types';
import { MakdownReadContent } from '../../shared/utils/markdown-read-content';
import DogIlustration from '../assets/DogIlustration.png';
import CatWater from '../assets/CatWater.jpg';
import CatVet from '../assets/CatVet.jpg';

export const BODY_WATER_LOSS_DEFAULT_DATA: ExperimentDefaultDataTypes = {
  header: {
    data: GetExperiment('body-water-loss'),
    imageSrc: DogIlustration,
    imageAlt: 'Imagem de um cão da raça golden tomando água.',
  },
  content: [
    {
      id: 1,
      title: 'Introdução',
      description:
        'Compreenda os mecanismos fisiológicos de homeostase hídrica e seus limiares de regulação.',
      markdown: MakdownReadContent(
        'src/features/experiment/body-water-loss/content/content-introduction-bwl.md'
      ),
      imgSrc: CatWater,
      imgAlt: 'Imagem de um gato bebendo águana torneira.',
    },
    {
      id: 2,
      title: 'Caso Clínico',
      description:
        'Analise um caso clínico real e aplique os conceitos de desidratação e balanço hídrico.',
      markdown: MakdownReadContent(
        'src/features/experiment/body-water-loss/content/content-clinic-case-bwl.md'
      ),
      imgSrc: CatVet,
      imgAlt: 'Imagem de um gato sendo examinado por um veterinário.',
    },
  ],
};
