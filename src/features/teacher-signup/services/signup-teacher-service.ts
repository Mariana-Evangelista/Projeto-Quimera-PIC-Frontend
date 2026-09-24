import { api } from '@/lib/api';

export interface TeacherSignupResponse {
  name: string;
  email: string;
  _id: string;
  __v: number;
}

export async function SignupTeacherService(
  name: string,
  email: string,
  password: string
): Promise<TeacherSignupResponse> {
  const { data } = await api.post<TeacherSignupResponse, { name: string; email: string; password: string }>(
    '/teacher/',
    { name, email, password },
    { auth: 'public' }
  );
  return data;
}