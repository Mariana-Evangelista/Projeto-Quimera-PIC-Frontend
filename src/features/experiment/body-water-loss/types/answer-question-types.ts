export interface BodyWaterLossAnswerTypes {
  label: string;
  value: string;
  weight: number;
}

export interface BodyWaterLossQuestionTypes {
  title: string;
  description: string;
  options: BodyWaterLossAnswerTypes[];
}
