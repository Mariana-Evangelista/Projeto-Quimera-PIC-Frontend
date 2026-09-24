'use server';

import z from 'zod';
import { TeacherLoginSchema, TeacherLoginFormData } from '../schemas/teacher-login-schema';
import { TeacherLoginFormState } from '../types/teacher-login-form-state';
import { LoginTeacherService } from '../services/login-teacher-service';
import { setTeacherAuthCookies } from '../services/set-teacher-auth-cookies';
import { ApiError } from '@/lib/api/errors';
import { redirect } from 'next/navigation';

export async function TeacherLoginAction(
  _prevState: TeacherLoginFormState,
  data: TeacherLoginFormData
): Promise<TeacherLoginFormState> {
  const validatedData = TeacherLoginSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      field_errors: z.flattenError(validatedData.error).fieldErrors,
      message: undefined,
      inputs: {
        email: String(data.email ?? ''),
      },
    };
  }

  const { email, password } = validatedData.data;
  let teacherId: string;

  try {
    const response = await LoginTeacherService(email, password);

    if (!response.teacher?._id || !response.token) {
      return {
        success: false,
        field_errors: undefined,
        message: 'Falha na autenticação. Resposta do servidor inválida.',
        inputs: { email },
      };
    }

    await setTeacherAuthCookies(response.token);
    teacherId = response.teacher._id;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.error.status === 401 || error.error.code === 'INVALID_CREDENTIALS') {
        return {
          success: false,
          field_errors: undefined,
          message: 'Credenciais inválidas. Verifique seu e-mail e senha.',
          inputs: { email },
        };
      }
      return {
        success: false,
        field_errors: undefined,
        message: error.error.message,
        inputs: { email },
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message: 'Erro inesperado. Tente novamente ou entre em contato com o suporte.',
      inputs: { email },
    };
  }

  redirect(`/teacher/${teacherId}`);
}
