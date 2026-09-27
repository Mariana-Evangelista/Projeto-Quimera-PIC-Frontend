// actions.ts
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function useClientLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('teacher-id');
  redirect('/login');
}
