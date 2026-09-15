import { NextRequest, NextResponse } from 'next/server';

import { verifyCookiePayload } from '@/lib/signed-cookies';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from './features/experiment-access/services/set-data-cookies';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);

  const [, slug, pin] = segments;

  if (!slug || !pin) {
    return redirectToAccessForm(request);
  }

  const token = request.cookies.get(EXPERIMENT_ACCESS_COOKIE)?.value;

  const access = await verifyCookiePayload<ExperimentAccessClaims>(
    token,
    'EXPERIMENT_ACCESS_SECRET'
  );

  const experiment = access?.experiment;

  const hasValidAccess =
    experiment !== undefined && experiment.type === slug && experiment.pin === pin;

  if (!hasValidAccess) {
    return redirectToAccessForm(request, slug);
  }

  return NextResponse.next();
}

function redirectToAccessForm(request: NextRequest, slug?: string) {
  const url = new URL('/experiment/' + slug, request.url);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/experiment/:slug/:pin'],
};
