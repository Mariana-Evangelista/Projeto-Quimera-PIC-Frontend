import Image from 'next/image';

import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { ExperimentHeaderTypes } from '@/features/experiment/shared/types/experiment-header-types';
import { GetExperiment } from '@/utils/get-experiment-by-slug';
import { ExperimentStatusBadge } from '@/components/experiment-status-badge';

interface ExperimentControlRoomHeaderProps {
  image: Pick<ExperimentHeaderTypes, 'imageSrc' | 'imageAlt'>;
  experiment: ExperimentDataTypes;
}

export function ExperimentControlRoomHeader({
  image,
  experiment,
}: ExperimentControlRoomHeaderProps) {
  const date = new Date(experiment.createdAt).toLocaleDateString();

  return (
    <header className="mt-10 mb-16 flex flex-col-reverse items-center justify-center gap-8 sm:flex-row sm:justify-between">
      <section className="space-y-4 sm:max-w-lg">
        <div>
          <p className="text-muted-foreground font-medium lg:text-lg">Experimento</p>
          <h1 className="text-primary text-4xl font-semibold min-[496px]:text-5xl lg:text-6xl">
            {GetExperiment(experiment.type)?.title}
          </h1>
        </div>

        <div className="space-y-1 text-sm">
          <p>
            Status: <ExperimentStatusBadge status={experiment.status} />
          </p>
          <p>
            Pin: <span className="font-medium">{experiment.pin}</span>
          </p>

          <p>{`${experiment.university}, Turma ${experiment.class}`}</p>
          <p>{date}</p>
        </div>
      </section>
      <Image
        src={image.imageSrc}
        alt={image.imageAlt}
        className="w-full max-w-xs lg:max-w-sm"
        priority={true}
      />
    </header>
  );
}
