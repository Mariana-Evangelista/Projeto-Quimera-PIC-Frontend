import { ExperimentWaitingRoom } from '../../shared/components/experiment-waiting-room';
import { ExperimentStatementGC } from './experiment-statement-gc';

export function ExperimentRoomGC() {
  const isWaitingRoom = false;
  return (
    <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160">
      {isWaitingRoom ? (
        <ExperimentWaitingRoom message="O professor irá liberar a sala do experimento." />
      ) : (
        <ExperimentStatementGC />
      )}
    </section>
  );
}
