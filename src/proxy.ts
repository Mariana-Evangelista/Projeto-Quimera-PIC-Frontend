import { NextRequest, NextResponse } from 'next/server';
import { GetExperimentCookiesValidationProxy } from './features/experiment-access/services/get-experiment-cookies-validation-proxy';
import { getApiConfig } from '@/lib/api/core/config';

const AUTH_ROUTES = ['/login', '/signup'];
const TEACHER_ROUTE_PREFIX = '/teacher/analytics';

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

function isTeacherRoute(pathname: string): boolean {
  return pathname.startsWith(TEACHER_ROUTE_PREFIX);
}

function getAuthenticatedTeacherId(request: NextRequest): string | null {
  const config = getApiConfig();
  const accessToken = request.cookies.get(config.tokenCookieName)?.value;
  const teacherId = request.cookies.get('teacher-id')?.value;

  if (!accessToken || !teacherId) {
    return null;
  }

  return teacherId;
}

function hasAccessToken(request: NextRequest): boolean {
  const config = getApiConfig();
  return Boolean(request.cookies.get(config.tokenCookieName)?.value);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAuthRoute(pathname)) {
    const teacherId = getAuthenticatedTeacherId(request);

    if (teacherId) {
      return NextResponse.redirect(new URL(`/teacher/analytics`, request.url));
    }
    return NextResponse.next();
  }

  if (isTeacherRoute(pathname)) {
    if (!hasAccessToken(request)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const experimentResponse = await GetExperimentCookiesValidationProxy(request);
  if (experimentResponse) {
    return experimentResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/experiment/:slug/:pin', '/login', '/signup', '/teacher/analytics/:path*'],
};
