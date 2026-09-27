import * as z from 'zod';

export const TeacherLoginSchema = z.object({
  email: z.email('Digite um e-mail válido'),
  password: z.string().min(1, 'Campo obrigatório'),
});

export type TeacherLoginFormData = z.infer<typeof TeacherLoginSchema>;
