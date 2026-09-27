'use server';

import { api } from '@/lib/api';
import { getApiConfig } from '@/lib/api/core/config';
import { verifyCookiePayload } from '@/lib/signed-cookies';
import { TeacherDataTypes } from '@/types/teacher-data-types';
import { cookies } from 'next/headers';

export async function GetTeacherDataService(): Promise<TeacherDataTypes | null> {
  const config = getApiConfig();
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(config.tokenCookieName)?.value;
  const validAccessToken = await verifyCookiePayload<{ token: string }>(
    accessToken,
    'TEACHER_ACCESS_TOKEN_SECRET'
  );

  const teacherId = cookieStore.get('teacher-id')?.value;
  const validTeacherId = await verifyCookiePayload<{ teacher: string }>(
    teacherId,
    'TEACHER_ACCESS_TOKEN_SECRET'
  );

  if (!validAccessToken || !validTeacherId) {
    return null;
  }

  const { data } = await api.get<TeacherDataTypes>(`/teacher/${validTeacherId.teacher}`, {
    auth: 'authenticated',
  });

  return data;
}
