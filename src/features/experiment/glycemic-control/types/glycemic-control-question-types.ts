export type OptionValue = 'a' | 'b' | 'c' | 'd';

export interface OptionTypes {
  value: OptionValue;
  label: string;
}

export interface GlycemicControlQuestionTypes {
  title: string;
  description: string;
  answer: OptionValue;
  options: OptionTypes[];
}
