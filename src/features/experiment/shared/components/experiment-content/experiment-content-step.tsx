import { cn } from '@/lib/utils';
import { ExperimentContentTypes } from '../../types/experiment-content-types';

interface ExperimentContentStepProps {
  content: ExperimentContentTypes;
  isActive: boolean;
  onChangeStep: () => void;
}

export function ExperimentContentStep({
  content,
  isActive,
  onChangeStep,
}: ExperimentContentStepProps) {
  return (
    <button
      onClick={onChangeStep}
      className={cn(
        'md:border-border flex w-full flex-col items-start gap-3 rounded-3xl p-2 max-[933px]:min-h-24 md:flex-row md:border',
        isActive && 'shadow-primary/80 md:shadow-md'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-3 text-xl',
          isActive ? 'border-primary' : 'border-border text-muted-foreground'
        )}
      >
        {content.id}
      </div>
      <div className={cn('text-start text-xs sm:text-sm', !isActive && 'text-muted-foreground')}>
        <h3 className="font-semibold">{content.title}</h3>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
    </button>
  );
}
