import { ExperimentsMap } from '@/constants/experiments-map';

export type ExperimentManageFormState = {
  success: boolean;
  message?: string;
  field_errors?: {
    type?: string[];
    university?: string[];
    class?: string[];
  };
  inputs: {
    type: ExperimentsMap;
    university: string;
    class: string;
  };
};
