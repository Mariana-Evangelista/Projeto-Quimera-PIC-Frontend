'use client';

import { useState } from 'react';
import { ExperimentContentStep } from './experiment-content-step';
import { ExperimentContentCard } from './experiment-content-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ClipboardPlus } from 'lucide-react';
import { ExperimentContentTypes } from '../../types/experiment-content-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ExperimentContentProps {
  content: ExperimentContentTypes[];
}

export function ExperimentContent({ content }: ExperimentContentProps) {
  const [activeStep, setActiveStep] = useState<ExperimentContentTypes>(content[0]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleStartExperimentRoom = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('start_experiment_room', 'true');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-16">
      <section>
        <ul className="flex items-start justify-between md:gap-4 lg:gap-8">
          {content.map((step) => (
            <li key={step.id} className="sm:w-1/2">
              <ExperimentContentStep
                content={step}
                onChangeStep={() => setActiveStep(step)}
                isActive={step.id === activeStep.id}
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <ExperimentContentCard content={activeStep} />

        {activeStep.id === 1 ? (
          <div className="my-8 flex justify-end">
            <Button
              className="cursor-pointer"
              onClick={() => {
                setActiveStep(content[1]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Próximo
              <ChevronRight />
            </Button>
          </div>
        ) : (
          <div className="my-8 flex justify-between">
            <Button
              className="border-border cursor-pointer border"
              onClick={() => {
                setActiveStep(content[0]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant={'outline'}
            >
              <ChevronLeft />
              Voltar
            </Button>
            <Button className="cursor-pointer" onClick={handleStartExperimentRoom}>
              <ClipboardPlus />
              Iniciar Tratamento
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
