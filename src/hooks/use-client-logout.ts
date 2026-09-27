'use server';

import { getApiConfig } from '@/lib/api/core/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function useClientLogout() {
  const config = getApiConfig();
  const cookieStore = await cookies();

  cookieStore.delete(config.tokenCookieName);
  cookieStore.delete('teacher-id');

  redirect('/');
}
