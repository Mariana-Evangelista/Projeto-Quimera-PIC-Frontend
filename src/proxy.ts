import { NextRequest, NextResponse } from 'next/server';
import { GetExperimentCookiesValidationProxy } from './proxy/get-experiment-cookies-validation-proxy';
import { HandleAuthRouteProxy, isAuthRoute } from './proxy/handle-auth-route-proxy';
import { HandleTeacherRouteProxy, isTeacherRoute } from './proxy/handle-teacher-route-proxy';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (isAuthRoute(pathname)) {
    return HandleAuthRouteProxy(request);
  }

  if (isTeacherRoute(pathname)) {
    return HandleTeacherRouteProxy(request);
  }

  const experimentResponse = await GetExperimentCookiesValidationProxy(request);

  return experimentResponse ?? NextResponse.next();
}

export const config = {
  matcher: ['/experiment/:slug/:pin', '/login', '/signup', '/teacher/:path*'],
};
