import 'server-only';

import { cookies } from 'next/headers';
import { getApiConfig } from '@/lib/api/core/config';
import { privateCookieDefaults, signCookiePayload } from '@/lib/signed-cookies';
import { TeacherLoginResponse } from './login-teacher-service';

const SECRET_ENV_NAME = 'TEACHER_ACCESS_TOKEN_SECRET';

export async function setTeacherAuthCookies(response: TeacherLoginResponse): Promise<void> {
  const config = getApiConfig();
  const tokenSign = await signCookiePayload(
    { token: response.token },
    SECRET_ENV_NAME,
    privateCookieDefaults.maxAgeSeconds
  );
  const teacherIdSign = await signCookiePayload(
    { teacher: response.teacher._id },
    SECRET_ENV_NAME,
    privateCookieDefaults.maxAgeSeconds
  );

  const cookieStore = await cookies();

  cookieStore.set(config.tokenCookieName, tokenSign, {
    ...privateCookieDefaults,
  });
  cookieStore.set('teacher-id', teacherIdSign, { ...privateCookieDefaults });
}
