'use client';

import { FaUser } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { TeacherDataTypes } from '@/types/teacher-data-types';
import { DefaultData } from '../default-data';

// async function fetchTeacherData(): Promise<TeacherDataTypes | null> {
//   const config = getApiConfig();
//   const cookieStore = await cookies();

//   const accessToken = cookieStore.get(config.tokenCookieName)?.value;

//   const validAccessToken = await verifyCookiePayload<{ token: string }>(
//     accessToken,
//     'TEACHER_ACCESS_TOKEN_SECRET'
//   );

//   if (!validAccessToken) {
//     return null;
//   }

//   const teacherId = cookieStore.get('teacher-id')?.value;
//   try {
//     const { data } = await api.get<TeacherDataTypes>(`/teacher/${teacherId}`, {
//       auth: 'authenticated',
//     });

//     return data;
//   } catch (error) {
//     unstable_rethrow(error);
//     return null;
//   }
// }

export function TeacherData({ data }: { data: TeacherDataTypes | null }) {
  if (!data) {
    return <DefaultData />;
  }

  const name = data.name.split(' ')[0];

  return (
    <div className="flex items-center gap-4 text-start text-sm sm:min-w-40">
      <div className="bg-muted text-muted-foreground/60 flex h-9 w-9 items-center justify-center rounded-full">
        <FaUser size={24} />
      </div>
      <div className="hidden sm:block">
        <p className="font-semibold">Olá, {name}</p>
      </div>
      <ChevronDown size={16} />
    </div>
  );
}
