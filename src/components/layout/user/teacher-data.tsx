'use client';

import { FaUser } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { TeacherDataTypes } from '@/types/teacher-data-types';
import { DefaultData } from './default-data';
import { TeacherNavLinks } from '../navigation/teacher-nav-links';

export function TeacherData({ data }: { data: TeacherDataTypes | null }) {
  if (!data) {
    return <DefaultData />;
  }

  const name = data.name.split(' ')[0];

  return (
    <>
      <TeacherNavLinks />
      <div className="flex items-center gap-4 text-start text-sm sm:min-w-40">
        <div className="bg-muted text-muted-foreground/60 flex h-9 w-9 items-center justify-center rounded-full">
          <FaUser size={24} />
        </div>
        <div className="hidden sm:block">
          <p className="font-semibold">Olá, {name}</p>
        </div>
        <ChevronDown size={16} />
      </div>
    </>
  );
}
