import * as z from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

export const TeacherSignupSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.email('Digite um e-mail válido'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(passwordRegex, 'A senha não deve conter caracteres especiais'),
});

export type TeacherSignupFormData = z.infer<typeof TeacherSignupSchema>;
