import 'server-only';

import { cookies } from 'next/headers';
import { getApiConfig } from './config';
import { verifyCookiePayload } from '@/lib/signed-cookies';

export async function readAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getApiConfig().tokenCookieName)?.value ?? null;

  const validAccessToken = await verifyCookiePayload<{ token: string }>(
    token || '',
    'TEACHER_ACCESS_TOKEN_SECRET'
  );
  return validAccessToken?.token || null;
}
