import { ExperimentContent } from '../shared/components/experiment-content';
import { ExperimentHeader } from '../shared/components/experiment-header';
import { BODY_WATER_LOSS_DEFAULT_DATA } from './constants/body-water-loss-default-data';
import { ExperimentRoomBWL } from './components/experiment-room-bwl';
import { StartExperimentRoomType } from '@/app/experiment/[slug]/[pin]/page';

export function BodyWaterLoss({ start_experiment_room }: StartExperimentRoomType) {
  const data = BODY_WATER_LOSS_DEFAULT_DATA;

  return (
    <>
      <ExperimentHeader header={data.header} />

      {start_experiment_room === 'true' ? (
        <ExperimentRoomBWL />
      ) : (
        <ExperimentContent content={data.content} />
      )}
    </>
  );
}
