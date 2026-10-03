import { ExperimentStatus } from '@/types/experiment-data-types';
import { cva } from 'class-variance-authority';
import { Badge } from './ui/badge';

export function ExperimentStatusBadge({ status }: { status: ExperimentStatus }) {
  const variants = cva('rounded-full px-2 py-1 text-xs font-medium text-foreground', {
    variants: {
      status: {
        'Não iniciado': 'bg-gray-200 ',
        'Em Progresso': 'bg-yellow-200 ',
        Finalizado: 'bg-green-200 ',
      },
    },
  });

  return <Badge className={variants({ status })}>{status}</Badge>;
}
