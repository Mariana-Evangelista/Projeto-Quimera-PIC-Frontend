import 'server-only';

import { cookies } from 'next/headers';
import { privateCookieDefaults, signCookiePayload } from '@/lib/signed-cookies';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export const EXPERIMENT_ACCESS_COOKIE =
  process.env.EXPERIMENT_ACCESS_COOKIE_NAME ?? 'experiment-access-cookie';
const SECRET_ENV_NAME = 'EXPERIMENT_ACCESS_SECRET';

export type ExperimentAccessClaims = {
  studentName: string;
  experiment: ExperimentDataTypes;
};

export async function setExperimentAccessCookie(claims: ExperimentAccessClaims): Promise<void> {
  const token = await signCookiePayload(
    claims,
    SECRET_ENV_NAME,
    privateCookieDefaults.maxAgeSeconds
  );
  const cookieStore = await cookies();

  cookieStore.set(EXPERIMENT_ACCESS_COOKIE, token, {
    ...privateCookieDefaults,
  });
}
