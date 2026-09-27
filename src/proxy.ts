import { NextRequest, NextResponse } from 'next/server';
import { GetExperimentCookiesValidationProxy } from './features/experiment-access/services/get-experiment-cookies-validation-proxy';
import {
  clearTeacherSessionCookies,
  hasValidTeacherSession,
} from './features/teacher-analytics/utils/teacher-route-guard-proxy';

const AUTH_ROUTES = ['/login', '/signup'];
const TEACHER_ROUTE_PREFIX = '/teacher/analytics';

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

function isTeacherRoute(pathname: string): boolean {
  return pathname.startsWith(TEACHER_ROUTE_PREFIX);
}

function redirectToTeacherAnalytics(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(TEACHER_ROUTE_PREFIX, request.url));
}

function redirectToHome(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL('/', request.url));
  return clearTeacherSessionCookies(response);
}

async function handleAuthRoute(request: NextRequest): Promise<NextResponse> {
  const hasValidSession = await hasValidTeacherSession(request);

  if (hasValidSession) {
    return redirectToTeacherAnalytics(request);
  }

  return NextResponse.next();
}

async function handleTeacherRoute(request: NextRequest): Promise<NextResponse> {
  const hasValidSession = await hasValidTeacherSession(request);

  if (!hasValidSession) {
    return redirectToHome(request);
  }

  return NextResponse.next();
}
async function handleExperimentRoute(request: NextRequest): Promise<NextResponse | null> {
  return GetExperimentCookiesValidationProxy(request);
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (isAuthRoute(pathname)) {
    return handleAuthRoute(request);
  }

  if (isTeacherRoute(pathname)) {
    return handleTeacherRoute(request);
  }

  const experimentResponse = await handleExperimentRoute(request);

  return experimentResponse ?? NextResponse.next();
}

export const config = {
  matcher: ['/experiment/:slug/:pin', '/login', '/signup', '/teacher/analytics/:path*'],
};
