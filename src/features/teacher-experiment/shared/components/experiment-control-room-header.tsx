import Image from 'next/image';

import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { ExperimentHeaderTypes } from '@/features/experiment/shared/types/experiment-header-types';
import { GetExperiment } from '@/utils/get-experiment-by-slug';

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
      <section className="space-y-3 sm:max-w-lg sm:space-y-8">
        <div>
          <p className="text-muted-foreground font-medium lg:text-lg">Experimento</p>
          <h1 className="text-primary text-4xl font-semibold min-[496px]:text-5xl lg:text-6xl">
            {GetExperiment(experiment.type)?.title}
          </h1>
        </div>

        <p className="text-sm sm:text-base">
          {`${experiment.university}, Turma ${experiment.class}`} <br /> {date}
        </p>
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
