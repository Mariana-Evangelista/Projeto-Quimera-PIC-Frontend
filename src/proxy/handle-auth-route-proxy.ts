import { NextRequest, NextResponse } from 'next/server';
import { hasValidTeacherSession } from './utils/teacher-route-guard';

const AUTH_ROUTES = ['/login', '/signup'];
const TEACHER_ROUTE_PREFIX = '/teacher/analytics';

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export async function HandleAuthRouteProxy(request: NextRequest): Promise<NextResponse> {
  const hasValidSession = await hasValidTeacherSession(request);

  if (hasValidSession) {
    return NextResponse.redirect(new URL(TEACHER_ROUTE_PREFIX, request.url));
  }

  return NextResponse.next();
}
