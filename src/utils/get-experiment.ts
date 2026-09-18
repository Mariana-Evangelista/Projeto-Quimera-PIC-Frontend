import { EXPERIMENTS_LIST_DATA } from '@/constants/experiments-list-data';
import { ExperimentsMap } from '@/constants/experiments-map';

export const GetExperiment = (slug: ExperimentsMap) => {
  const experiment = EXPERIMENTS_LIST_DATA.find((data) => data.slug === slug);

  return experiment;
};
