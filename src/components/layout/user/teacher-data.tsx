'use client';

import { FaUser } from 'react-icons/fa';
import { ChevronDown, LogOut } from 'lucide-react';
import { TeacherDataTypes } from '@/types/teacher-data-types';
import { DefaultData } from './default-data';
import { TeacherNavLinks } from '../navigation/teacher-nav-links';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClientLogout } from '@/hooks/use-client-logout';

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

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full">
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit rounded-lg md:mr-4" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="pb-0">Nome</DropdownMenuLabel>
              <DropdownMenuItem className="focus:bg-transparent">{data.name}</DropdownMenuItem>
              <DropdownMenuLabel className="pb-0">Email</DropdownMenuLabel>
              <DropdownMenuItem className="focus:bg-transparent">{data.email}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={useClientLogout}
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
