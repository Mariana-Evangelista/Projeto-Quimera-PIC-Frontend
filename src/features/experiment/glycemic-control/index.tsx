import { StartExperimentRoomType } from '@/app/experiment/[slug]/[pin]/page';
import { ExperimentContent } from '../shared/components/experiment-content';
import { ExperimentHeader } from '../shared/components/experiment-header';
import { GLYCEMIC_CONTROL_DEFAULT_DATA } from './constants/glycemic-control-default-data';
import { ExperimentRoomGC } from './components/experiment-room-gc';

export function GlycemicControl({ start_experiment_room }: StartExperimentRoomType) {
  const data = GLYCEMIC_CONTROL_DEFAULT_DATA;

  return (
    <div className="theme-glycemic-control pt-8">
      <ExperimentHeader header={data.header} />
      {start_experiment_room === 'true' ? (
        <ExperimentRoomGC />
      ) : (
        <ExperimentContent content={data.content} />
      )}
    </div>
  );
}
