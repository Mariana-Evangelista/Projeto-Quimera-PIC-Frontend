import { ExperimentListTypes } from '@/types/experiment-list-types';
import { StaticImageData } from 'next/image';

export interface ExperimentHeaderTypes {
  data: ExperimentListTypes | undefined;
  imageSrc: StaticImageData;
  imageAlt: string;
}
