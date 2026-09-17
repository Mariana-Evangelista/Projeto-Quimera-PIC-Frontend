'use client';

import { useState } from 'react';
import { ExperimentContentStep } from './experiment-content-step';
import { ExperimentContentCard } from './experiment-content-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ClipboardPlus } from 'lucide-react';
import { ExperimentContentTypes } from '../../types/experiment-content-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DialogConfirmAction } from '../dialog-confirm-action';

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
    router.replace(`${pathname}?${params.toString()}`);
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
              type="button"
              onClick={() => {
                setActiveStep(content[1]);
                console.log('Clicando');
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
              type="button"
              onClick={() => {
                setActiveStep(content[0]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant={'outline'}
            >
              <ChevronLeft />
              Voltar
            </Button>

            <DialogConfirmAction
              title="Tem certeza que deseja Iniciar o Experimento?"
              description="Não será possível voltar para estudar o caso clínico após confirmar."
              onConfirmAction={handleStartExperimentRoom}
            >
              <Button className="cursor-pointer">
                <ClipboardPlus />
                Iniciar Tratamento
              </Button>
            </DialogConfirmAction>
          </div>
        )}
      </section>
    </div>
  );
}
