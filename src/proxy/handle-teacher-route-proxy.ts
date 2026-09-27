import { NextRequest, NextResponse } from 'next/server';
import {
  clearTeacherSessionCookies,
  hasValidTeacherSession,
} from './utils/teacher-route-guard-proxy';

const TEACHER_ROUTE_PREFIX = '/teacher/analytics';

export function isTeacherRoute(pathname: string): boolean {
  return pathname.startsWith(TEACHER_ROUTE_PREFIX);
}

export async function HandleTeacherRouteProxy(request: NextRequest): Promise<NextResponse> {
  const hasValidSession = await hasValidTeacherSession(request);

  if (!hasValidSession) {
    const response = NextResponse.redirect(new URL('/', request.url));
    return clearTeacherSessionCookies(response);
  }

  return NextResponse.next();
}
