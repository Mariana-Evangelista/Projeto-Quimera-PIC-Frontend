import Image from 'next/image';
import { ExperimentHeaderTypes } from '../types/experiment-header-types';

interface ExperimentHeaderProps {
  header: ExperimentHeaderTypes;
}

export function ExperimentHeader({ header }: ExperimentHeaderProps) {
  const header_data = header.data ?? { title: 'Experimento', description: 'Descrição' };

  return (
    <header className="mt-10 mb-16 flex flex-col-reverse items-center justify-center gap-8 sm:flex-row sm:justify-between">
      <section className="space-y-3 sm:max-w-lg sm:space-y-8">
        <div>
          <p className="text-muted-foreground font-medium lg:text-lg">Experimento</p>
          <h1 className="text-primary text-4xl font-semibold min-[496px]:text-5xl lg:text-6xl">
            {header_data.title}
          </h1>
        </div>

        <p className="text-sm sm:text-base">{header_data.description}</p>
      </section>
      <Image
        src={header.imageSrc}
        alt={header.imageAlt}
        className="w-full max-w-xs lg:max-w-sm"
        priority={true}
      />
    </header>
  );
}
