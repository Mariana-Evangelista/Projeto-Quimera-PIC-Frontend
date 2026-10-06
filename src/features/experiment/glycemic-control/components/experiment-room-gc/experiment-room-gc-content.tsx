'use client';

import { ExperimentsMap } from '@/constants/experiments-map';
import { ExperimentWaitingRoom } from '@/features/experiment/shared/components/experiment-waiting-room';
import { ExperimentState } from '@/features/experiment/shared/store/experiment-socket-store';

import { useExperimentSocket } from '@/features/experiment/shared/hooks/use-experiment-socket';
import { SocketErrorRoom } from '@/components/socket-error-room';
import { useSearchParams } from 'next/navigation';
import { ExperimentStatementGC } from '../experiment-statement-gc';
import { ExperimentResultGC } from '../experiment-result-gc';

interface ExperimentRoomGCContentProps {
  pin: string;
  slug: ExperimentsMap;
  initialState: ExperimentState;
}

export function ExperimentRoomGCContent({ pin, slug, initialState }: ExperimentRoomGCContentProps) {
  const { liberateSend, liberateResult, error, isConnected, reconnect } = useExperimentSocket(
    pin,
    slug,
    initialState
  );

  const searchParams = useSearchParams();

  const isSendResponse = searchParams.get('is_send_response');

  if (error !== undefined && !isConnected) {
    return (
      <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160" data-testid="socket-error-room">
        <SocketErrorRoom message={error} onReconnect={reconnect} />
      </section>
    );
  }

  return (
    <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160" data-testid="student-experiment-room-gc">
      {!liberateSend && !isSendResponse && (
        <ExperimentWaitingRoom message="O professor logo irá liberar a sala do experimento." />
      )}

      {liberateSend && !isSendResponse && <ExperimentStatementGC />}

      {!liberateResult && isSendResponse && (
        <ExperimentWaitingRoom message="O professor logo irá liberar os resultados." />
      )}

      {!liberateSend && liberateResult && isSendResponse && <ExperimentResultGC />}
    </section>
  );
}
