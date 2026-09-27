import { NextRequest, NextResponse } from 'next/server';
import { getApiConfig } from '@/lib/api/core/config';
import { verifyCookiePayload } from '@/lib/signed-cookies';

const TEACHER_ID_COOKIE = 'teacher-id';
const TEACHER_ACCESS_TOKEN_SECRET = 'TEACHER_ACCESS_TOKEN_SECRET';

export function clearTeacherSessionCookies(response: NextResponse): NextResponse {
  const { tokenCookieName } = getApiConfig();

  response.cookies.delete(tokenCookieName);
  response.cookies.delete(TEACHER_ID_COOKIE);

  return response;
}

function getAccessToken(request: NextRequest): string | undefined {
  const { tokenCookieName } = getApiConfig();

  return request.cookies.get(tokenCookieName)?.value;
}

function getTeacherId(request: NextRequest): string | undefined {
  return request.cookies.get(TEACHER_ID_COOKIE)?.value;
}

export async function hasValidAccessToken(request: NextRequest): Promise<boolean> {
  const accessToken = getAccessToken(request);

  const validAccessToken = await verifyCookiePayload<{ token: string }>(
    accessToken,
    TEACHER_ACCESS_TOKEN_SECRET
  );

  return Boolean(validAccessToken?.token && validAccessToken.token.trim().length > 0);
}

export function hasTeacherId(request: NextRequest): boolean {
  const teacherId = getTeacherId(request);

  return Boolean(teacherId?.trim());
}

export async function hasValidTeacherSession(request: NextRequest): Promise<boolean> {
  const [validAccessToken, validTeacherId] = await Promise.all([
    hasValidAccessToken(request),
    hasTeacherId(request),
  ]);

  return validAccessToken && validTeacherId;
}
