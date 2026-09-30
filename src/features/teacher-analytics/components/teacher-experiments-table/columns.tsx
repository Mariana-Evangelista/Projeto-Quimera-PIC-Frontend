'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from './data-table-features';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { GetExperiment } from '@/utils/get-experiment-by-slug';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLink, MoreHorizontal, Trash2Icon } from 'lucide-react';
import { DialogUpdateExperiment } from '@/features/experiment-manage/components/dialog-update-experiment';

const columnHelper = createColumnHelper<DataTableFeatures, ExperimentDataTypes>();

export const columns = columnHelper.columns([
  columnHelper.accessor('type', {
    header: 'Tipo',
    cell: ({ row }) => GetExperiment(row.original.type)?.title ?? row.original.type,
  }),
  columnHelper.accessor('pin', {
    header: 'PIN',
  }),
  columnHelper.accessor('university', {
    header: 'Universidade',
  }),
  columnHelper.accessor('class', {
    header: 'Turma',
  }),
  columnHelper.accessor('responsesNumber', {
    header: 'Respostas',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Data de Criação',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full">
            <MoreHorizontal size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <ExternalLink />
              Abrir
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <DialogUpdateExperiment experiment={row.original} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" variant="destructive">
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
