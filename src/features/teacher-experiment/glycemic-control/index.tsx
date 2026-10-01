import { GLYCEMIC_CONTROL_DEFAULT_DATA } from '@/features/experiment/glycemic-control/constants/glycemic-control-default-data';
import { ExperimentHeaderTypes } from '@/features/experiment/shared/types/experiment-header-types';
import { ExperimentControlRoomHeader } from '../shared/components/experiment-control-room-header';
import { ExperimentDataTypes } from '@/types/experiment-data-types';

export function TeacherGlycemicControlView({ experiment }: { experiment: ExperimentDataTypes }) {
  const image: Pick<ExperimentHeaderTypes, 'imageSrc' | 'imageAlt'> = {
    imageAlt: GLYCEMIC_CONTROL_DEFAULT_DATA.header.imageAlt,
    imageSrc: GLYCEMIC_CONTROL_DEFAULT_DATA.header.imageSrc,
  };
  return (
    <div className="theme-glycemic-control">
      <ExperimentControlRoomHeader image={image} experiment={experiment} />
    </div>
  );
}
