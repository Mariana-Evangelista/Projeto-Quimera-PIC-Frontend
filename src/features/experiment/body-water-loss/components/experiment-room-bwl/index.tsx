import { getSignedCookieAccess } from '@/utils/get-signed-cookies';
import { ExperimentRoomBWLContent } from './experiment-room-bwl-content';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from '@/features/experiment-access/services/set-data-cookies';
import { ExperimentState } from '@/features/experiment/shared/store/experiment-socket-store';
import { GetExperimentByPinService } from '@/features/experiment-access/services/get-experiment-by-pin-service';
import { ExperimentErrorRoom } from '@/features/experiment/shared/components/experiment-error-room';

export async function ExperimentRoomBWL() {
  const socketAccessData = await getSignedCookieAccess<ExperimentAccessClaims>(
    EXPERIMENT_ACCESS_COOKIE,
    'EXPERIMENT_ACCESS_SECRET'
  );

  if (socketAccessData) {
    const { pin, type } = socketAccessData;

    const experimentData = await GetExperimentByPinService(pin, type);

    const initialState: ExperimentState = {
      experimentId: experimentData._id,
      liberateSend: experimentData.liberateSend,
      liberateResult: experimentData.liberateResult,
      isConnected: false,
    };

    return <ExperimentRoomBWLContent pin={pin} slug={type} initialState={initialState} />;
  }

  return (
    <section className="border-border mb-16 flex min-h-80 w-full items-center justify-center rounded-2xl border p-4 shadow-md md:min-h-160">
      <ExperimentErrorRoom message="Não foi possível acessar os dados do experimento.Tente entrar novamente com o PIN." />
    </section>
  );
}
