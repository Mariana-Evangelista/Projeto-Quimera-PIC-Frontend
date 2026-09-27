'use server';

import z from 'zod';
import { TeacherSignupSchema, TeacherSignupFormData } from '../schemas/teacher-signup-schema';
import { TeacherSignupFormState } from '../types/teacher-signup-form-state';
import { SignupTeacherService } from '../services/signup-teacher-service';
import { ApiError } from '@/lib/api/errors/api-error';

export async function TeacherSignupAction(
  _prevState: TeacherSignupFormState,
  data: TeacherSignupFormData
): Promise<TeacherSignupFormState> {
  const validatedData = TeacherSignupSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      field_errors: z.flattenError(validatedData.error).fieldErrors,
      message: undefined,
      inputs: {
        name: String(data.name ?? ''),
        email: String(data.email ?? ''),
      },
    };
  }

  const { name, email, password } = validatedData.data;

  try {
    await SignupTeacherService(name, email, password);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.error.code === 'TEACHER_EMAIL_CONFLICT' || error.error.status === 404) {
        return {
          success: false,
          field_errors: undefined,
          message: 'E-mail já cadastrado',
          inputs: { name, email },
        };
      }
      return {
        success: false,
        field_errors: undefined,
        message: error.error.message,
        inputs: { name, email },
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message: 'Erro inesperado. Tente novamente ou entre em contato com o suporte.',
      inputs: { name, email },
    };
  }

  return {
    success: true,
    message: 'Cadastro realizado com sucesso!',
    field_errors: undefined,
    inputs: { name: '', email: '' },
  };
}
