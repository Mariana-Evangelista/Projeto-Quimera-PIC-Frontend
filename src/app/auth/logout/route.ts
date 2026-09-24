import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getApiConfig } from '@/lib/api/core/config';

export async function GET(request: NextRequest) {
  const config = getApiConfig();
  const cookieStore = await cookies();

  cookieStore.delete(config.tokenCookieName);
  cookieStore.delete('teacher-id');

  return NextResponse.redirect(new URL('/login', request.url));
}
