import { StaticImageData } from 'next/image';

export interface ExperimentContentTypes {
  id: 1 | 2;
  title: string;
  description: string;
  markdown: string;
  imgSrc: StaticImageData;
  imgAlt: string;
}
