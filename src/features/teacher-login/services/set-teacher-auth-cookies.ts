import 'server-only';

import { cookies } from 'next/headers';
import { getApiConfig } from '@/lib/api/core/config';

export async function setTeacherAuthCookies(token: string): Promise<void> {
  const config = getApiConfig();
  const cookieStore = await cookies();

  cookieStore.set(config.tokenCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
}