export type GlycemicControlResponseFormState = {
  success: boolean;
  message?: string;
  field_errors?: {
    question_1?: string[];
    question_2?: string[];
    question_3?: string[];
    question_4?: string[];
    question_5?: string[];
  };
  inputs?: {
    question_1?: string;
    question_2?: string;
    question_3?: string;
    question_4?: string;
    question_5?: string;
  };
};