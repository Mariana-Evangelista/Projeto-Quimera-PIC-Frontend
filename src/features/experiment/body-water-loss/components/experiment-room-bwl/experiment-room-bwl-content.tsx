'use client';

import { ExperimentsMap } from '@/constants/experiments-map';
import { ExperimentWaitingRoom } from '../../../shared/components/experiment-waiting-room';
import { ExperimentState } from '../../../shared/store/experiment-socket-store';
import { ExperimentStatementBWL } from '../experiment-statement-bwl';
import { useExperimentSocket } from '@/features/experiment/shared/hooks/use-experiment-socket';
import { ExperimentErrorRoom } from '@/features/experiment/shared/components/experiment-error-room';
import { useSearchParams } from 'next/navigation';

interface ExperimentRoomBWLProps {
  pin: string;
  slug: ExperimentsMap;
  initialState: ExperimentState;
}

export function ExperimentRoomBWLContent({ pin, slug, initialState }: ExperimentRoomBWLProps) {
  const { liberateSend, liberateResult, error } = useExperimentSocket(pin, slug, initialState);

  const searchParams = useSearchParams();

  const isSendResponse = searchParams.get('is_send_response');

  if (error !== undefined) {
    return (
      <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160">
        <ExperimentErrorRoom message={error} />
      </section>
    );
  }

  return (
    <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160">
      {!liberateSend && !isSendResponse && (
        <ExperimentWaitingRoom message="O professor logo irá liberar a sala do experimento." />
      )}

      {liberateSend && !isSendResponse && <ExperimentStatementBWL />}

      {!liberateResult && isSendResponse && (
        <ExperimentWaitingRoom message="O professor logo irá liberar os resultados." />
      )}

      {!liberateSend && liberateResult && isSendResponse && <div>Resultados Liberados</div>}
    </section>
  );
}
