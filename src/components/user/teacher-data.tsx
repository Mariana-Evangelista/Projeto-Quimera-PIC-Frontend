import { User } from '@/components/user/user';
import { api } from '@/lib/api';
import { getApiConfig } from '@/lib/api/core/config';
import { verifyCookiePayload } from '@/lib/signed-cookies';
import { TeacherDataTypes } from '@/types/teacher-data-types';
import { cookies } from 'next/headers';
import { DefaultData } from './default-data';
import { unstable_rethrow } from 'next/navigation';

async function fetchTeacherData(): Promise<TeacherDataTypes | null> {
  const config = getApiConfig();
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(config.tokenCookieName)?.value;

  const validAccessToken = await verifyCookiePayload<{ token: string }>(
    accessToken,
    'TEACHER_ACCESS_TOKEN_SECRET'
  );

  if (!validAccessToken) {
    return null;
  }

  const teacherId = cookieStore.get('teacher-id')?.value;
  try {
    const { data } = await api.get<TeacherDataTypes>(`/teacher/${teacherId}`, {
      auth: 'authenticated',
    });

    return data;
  } catch (error) {
    unstable_rethrow(error);
    return null;
  }
}

export async function TeacherData() {
  const data = await fetchTeacherData();

  if (!data) {
    return <DefaultData />;
  }

  return <User name={data.name} description={data.email} />;
}
