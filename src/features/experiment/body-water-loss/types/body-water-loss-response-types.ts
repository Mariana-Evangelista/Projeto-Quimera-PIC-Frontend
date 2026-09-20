import { BodyWaterLossAnswerTypes } from './body-water-loss-question-types';

export interface BodyWaterLossResponseTypes {
  studentName: string;
  pin: string;
  answerOne: BodyWaterLossAnswerTypes;
  answerTwo: BodyWaterLossAnswerTypes;
  score?: number;
}
