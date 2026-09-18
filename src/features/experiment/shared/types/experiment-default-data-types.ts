import { ExperimentContentTypes } from './experiment-content-types';
import { ExperimentHeaderTypes } from './experiment-header-types';

export interface ExperimentDefaultDataTypes {
  header: ExperimentHeaderTypes;
  content: ExperimentContentTypes[];
}
