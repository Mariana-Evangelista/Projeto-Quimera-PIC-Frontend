export type OptionValue = 'a' | 'b' | 'c' | 'd';

export interface GlycemicControlAnswerTypes {
  question: number;
  answer: OptionValue;
  weight: number;
}

export interface GlycemicControlResponseTypes {
  studentName: string;
  pin: string;
  answers: GlycemicControlAnswerTypes[];
  score?: number;
}