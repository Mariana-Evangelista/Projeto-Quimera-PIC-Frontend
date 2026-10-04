'use client';

import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { GetExperiment } from '@/utils/get-experiment-by-slug';
import { ExperimentStatusBadge } from '@/components/experiment-status-badge';
import { Bookmark, Calendar, CircleDashed, Landmark, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ExperimentControlRoomHeaderProps {
  experiment: ExperimentDataTypes;
}

export function ExperimentControlRoomHeader({ experiment }: ExperimentControlRoomHeaderProps) {
  const date = new Date(experiment.createdAt).toLocaleDateString();

  const router = useRouter();

  return (
    <>
      <Button variant={'outline'} className="my-8 cursor-pointer" onClick={() => router.back()}>
        <Undo2 />
        Voltar
      </Button>
      <header className="mb-16 grid grid-rows-2 items-center gap-8 sm:grid-cols-2 sm:grid-rows-1">
        <section className="space-y-4">
          <div>
            <p className="text-muted-foreground">Experimento</p>
            <h1 className="text-primary text-4xl font-semibold min-[496px]:text-5xl">
              {GetExperiment(experiment.type)?.title}
            </h1>
          </div>
        </section>

        <section className="grid grid-cols-2 grid-rows-2 gap-4 text-xs sm:text-sm">
          <p className="flex items-center gap-2">
            <Bookmark size={16} />
            Pin: <span className="font-medium">{experiment.pin}</span>
          </p>
          <p className="flex items-center gap-2">
            <CircleDashed size={16} />
            Status: <ExperimentStatusBadge status={experiment.status} />
          </p>
          <p className="flex items-center gap-2">
            <Landmark size={16} />
            {`${experiment.university}, Turma ${experiment.class}`}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} />
            {date}
          </p>
        </section>
      </header>
    </>
  );
}
