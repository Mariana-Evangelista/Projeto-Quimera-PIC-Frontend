import { connection, NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getApiConfig } from '@/lib/api/core/config';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  await connection();
  const config = getApiConfig();
  const cookieStore = await cookies();

  cookieStore.delete(config.tokenCookieName);
  cookieStore.delete('teacher-id');

  revalidatePath('/default', 'layout');

  return NextResponse.redirect(new URL('/', request.url));
}
