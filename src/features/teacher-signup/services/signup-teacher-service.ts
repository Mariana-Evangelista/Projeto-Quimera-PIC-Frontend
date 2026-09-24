import { api } from '@/lib/api';
import { TeacherDataTypes } from '@/types/teacher-data-types';

export async function SignupTeacherService(
  name: string,
  email: string,
  password: string
): Promise<TeacherDataTypes> {
  const { data } = await api.post<
    TeacherDataTypes,
    { name: string; email: string; password: string }
  >('/teacher/', { name, email, password }, { auth: 'public' });
  return data;
}
