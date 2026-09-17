import { cookies } from 'next/headers';
import { verifyCookiePayload } from '@/lib/signed-cookies';

export async function getSignedCookieAccess<TClaims extends Record<string, unknown>>(
  cookieName: string,
  secretEnvVar: string
) {
  const token = (await cookies()).get(cookieName)?.value;

  const access = await verifyCookiePayload<TClaims>(token, secretEnvVar);

  return access;
}
