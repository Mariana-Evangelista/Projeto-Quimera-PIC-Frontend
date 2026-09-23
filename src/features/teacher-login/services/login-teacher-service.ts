import { api } from '@/lib/api';

export interface TeacherLoginResponse {
  teacher: {
    _id: string;
    name: string;
    email: string;
    __v?: number;
  };
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