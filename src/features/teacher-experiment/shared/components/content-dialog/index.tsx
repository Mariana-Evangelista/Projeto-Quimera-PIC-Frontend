'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, File } from 'lucide-react';
import { ExperimentContentTypes } from '@/features/experiment/shared/types/experiment-content-types';
import { useState } from 'react';
import { ContentMarkdown } from './content-markdown';

export function ContentDialog({ content }: { content: ExperimentContentTypes[] }) {
  const [activeStep, setActiveStep] = useState<0 | 1>(0);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <File />
          Ver Conteúdo
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl">
        <div className="no-scrollbar max-h-[75vh] space-y-4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{content[activeStep]?.title}</DialogTitle>
            <DialogDescription>{content[activeStep]?.description}</DialogDescription>
          </DialogHeader>
          <ContentMarkdown content={content[activeStep]} />
        </div>
        <DialogFooter>
          {activeStep === 0 ? (
            <div className="flex justify-end">
              <Button
                className="cursor-pointer bg-gray-600 hover:bg-gray-600/70"
                type="button"
                onClick={() => {
                  setActiveStep(1);
                }}
              >
                Próximo
                <ChevronRight />
              </Button>
            </div>
          ) : (
            <div className="flex w-full justify-between">
              <Button
                className="border-border cursor-pointer border"
                type="button"
                onClick={() => {
                  setActiveStep(0);
                }}
                variant={'outline'}
              >
                <ChevronLeft />
                Voltar
              </Button>

              <Button
                className="cursor-pointer bg-gray-600 hover:bg-gray-600/70"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Fechar
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
