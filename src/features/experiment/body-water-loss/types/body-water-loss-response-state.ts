import { BodyWaterLossAnswerTypes } from './body-water-loss-question-types';

export type BodyWaterLossResponseFormState = {
  success: boolean;
  message?: string;
  field_errors?: {
    option_1?: string[];
    option_2?: string[];
  };
  inputs?: {
    option_1?: BodyWaterLossAnswerTypes;
    option_2?: BodyWaterLossAnswerTypes;
  };
};
