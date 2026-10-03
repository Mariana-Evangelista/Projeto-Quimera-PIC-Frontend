'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire';
import { BODY_WATER_LOSS_EXPERIMENT_QUESTIONS } from '@/features/experiment/body-water-loss/constants/body-water-loss-experiment-questions';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export function QuestionsDialog() {
  const [open, setOpen] = useState(false);

  const experimentQuestions = BODY_WATER_LOSS_EXPERIMENT_QUESTIONS;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Eye />
          Ver Gabarito
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl">
        <Questionnaire className="mt-12">
          <div className="no-scrollbar max-h-[75vh] space-y-4 overflow-y-auto">
            <QuestionnaireProgress
              className="w-full"
              render={(props, state) => (
                <div {...props}>
                  <div className="mb-2 flex gap-1.5" aria-hidden="true">
                    {Array.from({ length: state.total }, (_, index) => (
                      <span
                        key={index}
                        className={
                          index < state.current
                            ? 'h-1.5 flex-1 rounded-full bg-gray-600'
                            : 'bg-muted h-1.5 flex-1 rounded-full'
                        }
                      />
                    ))}
                  </div>
                  <span>
                    Resposta {state.current} de {state.total}
                  </span>
                </div>
              )}
            />
            {experimentQuestions.map((question, index) => (
              <QuestionnaireItem key={index} name={`option_${index + 1}`} required>
                <QuestionnaireTitle className="mb-4">{question.title}</QuestionnaireTitle>
                <QuestionnaireDescription>{question.description}</QuestionnaireDescription>

                <QuestionnaireChoices>
                  {question.options.map((option) => (
                    <QuestionnaireChoice key={option.value} value={option.value}>
                      {option.value}
                    </QuestionnaireChoice>
                  ))}
                </QuestionnaireChoices>
              </QuestionnaireItem>
            ))}
          </div>
          <DialogFooter>
            <QuestionnaireActions>
              <QuestionnairePrevious className="cursor-pointer">Voltar</QuestionnairePrevious>
              <QuestionnaireNext className="cursor-pointer bg-gray-600 hover:bg-gray-600/70">
                Próximo
              </QuestionnaireNext>

              <QuestionnaireSubmit
                className="cursor-pointer bg-gray-600 hover:bg-gray-600/70"
                onClick={() => setOpen(false)}
              >
                Fechar
              </QuestionnaireSubmit>
            </QuestionnaireActions>
          </DialogFooter>
        </Questionnaire>
      </DialogContent>
    </Dialog>
  );
}
