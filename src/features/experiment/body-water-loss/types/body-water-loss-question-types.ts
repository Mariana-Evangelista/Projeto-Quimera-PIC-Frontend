export interface BodyWaterLossAnswerTypes {
  value: string;
  weight: number;
}

export interface BodyWaterLossQuestionTypes {
  title: string;
  description: string;
  options: BodyWaterLossAnswerTypes[];
}
