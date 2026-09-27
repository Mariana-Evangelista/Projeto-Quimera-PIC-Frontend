import { api } from '@/lib/api';
import { TeacherDataTypes } from '@/types/teacher-data-types';

export interface TeacherLoginResponse {
  teacher: TeacherDataTypes;
  token: string;
}

export async function LoginTeacherService(
  email: string,
  password: string
): Promise<TeacherLoginResponse> {
  const { data } = await api.post<TeacherLoginResponse, { email: string; password: string }>(
    '/auth/login',
    { email, password },
    { auth: 'public' }
  );
  return data;
}
