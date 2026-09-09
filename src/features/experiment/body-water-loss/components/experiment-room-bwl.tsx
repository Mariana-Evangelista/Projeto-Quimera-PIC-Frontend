import { ExperimentWaitingRoom } from '../../shared/components/experiment-waiting-room';
import { ExperimentStatementBWL } from './experiment-statement-bwl';

export function ExperimentRoomBWL() {
  const isWaitingRoom = true;
  return (
    <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160">
      {isWaitingRoom ? (
        <ExperimentWaitingRoom message="O professor irá liberar a sala do experimento." />
      ) : (
        <ExperimentStatementBWL />
      )}
    </section>
  );
}
