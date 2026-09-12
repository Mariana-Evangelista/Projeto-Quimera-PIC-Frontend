import 'server-only';

import { cookies } from 'next/headers';
import { getApiConfig } from './config';

export async function readAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(getApiConfig().tokenCookieName)?.value ?? null;
}
