import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { ExperimentControlRoomHeader } from '../shared/components/experiment-control-room-header';
import { ExperimentHeaderTypes } from '@/features/experiment/shared/types/experiment-header-types';
import { BODY_WATER_LOSS_DEFAULT_DATA } from '@/features/experiment/body-water-loss/constants/body-water-loss-default-data';
import { ControlPanel } from '../shared/components/control-panel';
import { ContentDialog } from '../shared/components/content-dialog';
import { QuestionsDialogBwl } from './components/questions-dialog-bwl';
import { BodyWaterLossDashboard } from './components/body-water-loss-dashboard';

export function TeacherBodyWaterLossView({ experiment }: { experiment: ExperimentDataTypes }) {
  const image: Pick<ExperimentHeaderTypes, 'imageSrc' | 'imageAlt'> = {
    imageAlt: BODY_WATER_LOSS_DEFAULT_DATA.header.imageAlt,
    imageSrc: BODY_WATER_LOSS_DEFAULT_DATA.header.imageSrc,
  };
  return (
    <div className="theme-experiment w-full">
      <ExperimentControlRoomHeader image={image} experiment={experiment} />

      <section className="mb-16 flex flex-col gap-8 lg:flex-row">
        <ControlPanel experimentId={experiment._id} status={experiment.status}>
          <>
            <ContentDialog content={BODY_WATER_LOSS_DEFAULT_DATA.content} />
            <QuestionsDialogBwl />
          </>
        </ControlPanel>
        <BodyWaterLossDashboard experiment={experiment} />
      </section>
    </div>
  );
}
