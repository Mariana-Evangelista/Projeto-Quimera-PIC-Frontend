'use client';

import { useState } from 'react';
import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DeleteExperimentFeature,
  DialogUpdateExperiment,
} from '@/features/teacher-experiment-manage';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { useRouter } from 'next/navigation';

export function ExperimentActionsCell({ experiment }: { experiment: ExperimentDataTypes }) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-full">
          <MoreHorizontal size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => router.push(`/teacher/experiment/${experiment._id}`)}
            data-testid={`experiment-action-open-${experiment._id}`}
          >
            <ExternalLink />
            Abrir
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => setUpdateOpen(true)} data-testid={`experiment-action-edit-${experiment._id}`}>
            <Pencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setDeleteOpen(true)}
            variant="destructive"
            data-testid={`experiment-action-delete-${experiment._id}`}
          >
            <Trash2 />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogUpdateExperiment experiment={experiment} open={updateOpen} setOpen={setUpdateOpen} />
      <DeleteExperimentFeature id={experiment._id} open={deleteOpen} setOpen={setDeleteOpen} />
    </>
  );
}
