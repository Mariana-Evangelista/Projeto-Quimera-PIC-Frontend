import 'server-only';

import { cookies } from 'next/headers';
import { getApiConfig } from '@/lib/api/core/config';
import { privateCookieDefaults, signCookiePayload } from '@/lib/signed-cookies';

const SECRET_ENV_NAME = 'TEACHER_ACCESS_TOKEN_SECRET';

export async function setTeacherAuthCookies(token: string): Promise<void> {
  const config = getApiConfig();
  const tokenSign = await signCookiePayload(
    { token },
    SECRET_ENV_NAME,
    privateCookieDefaults.maxAgeSeconds
  );
  const cookieStore = await cookies();

  cookieStore.set(config.tokenCookieName, tokenSign, {
    ...privateCookieDefaults,
  });
}
