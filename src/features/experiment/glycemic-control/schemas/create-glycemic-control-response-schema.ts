import * as z from 'zod';

export const GlycemicControlResponseSchema = z.object({
  question_1: z.string().min(1, 'Selecione uma opção para continuar.'),
  question_2: z.string().min(1, 'Selecione uma opção para continuar.'),
  question_3: z.string().min(1, 'Selecione uma opção para continuar.'),
  question_4: z.string().min(1, 'Selecione uma opção para continuar.'),
  question_5: z.string().min(1, 'Selecione uma opção para continuar.'),
});

export type GlycemicControlResponseFormData = z.infer<typeof GlycemicControlResponseSchema>;