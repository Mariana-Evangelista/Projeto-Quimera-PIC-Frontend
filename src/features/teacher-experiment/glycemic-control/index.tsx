import { GLYCEMIC_CONTROL_DEFAULT_DATA } from '@/features/experiment/glycemic-control/constants/glycemic-control-default-data';
import { ExperimentHeaderTypes } from '@/features/experiment/shared/types/experiment-header-types';
import { ExperimentControlRoomHeader } from '../shared/components/experiment-control-room-header';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { ControlPanel } from '../shared/components/control-panel';
import { ContentDialog } from '../shared/components/content-dialog';
import { QuestionsDialogGc } from './components/questions-dialog-gc';
import { GlycemicControlDashboard } from './components/glycemic-control-dashboard';

export function TeacherGlycemicControlView({ experiment }: { experiment: ExperimentDataTypes }) {
  const image: Pick<ExperimentHeaderTypes, 'imageSrc' | 'imageAlt'> = {
    imageAlt: GLYCEMIC_CONTROL_DEFAULT_DATA.header.imageAlt,
    imageSrc: GLYCEMIC_CONTROL_DEFAULT_DATA.header.imageSrc,
  };
  return (
    <div className="theme-glycemic-control">
      <ExperimentControlRoomHeader image={image} experiment={experiment} />
      <ControlPanel experimentId={experiment._id} status={experiment.status}>
        <>
          <ContentDialog content={GLYCEMIC_CONTROL_DEFAULT_DATA.content} />
          <QuestionsDialogGc />
        </>
      </ControlPanel>
      <GlycemicControlDashboard experiment={experiment} />
    </div>
  );
}
