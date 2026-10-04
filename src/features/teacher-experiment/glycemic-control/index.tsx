import { GLYCEMIC_CONTROL_DEFAULT_DATA } from '@/features/experiment/glycemic-control/constants/glycemic-control-default-data';
import { ExperimentControlRoomHeader } from '../shared/components/experiment-control-room-header';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { ControlPanel } from '../shared/components/control-panel';
import { ContentDialog } from '../shared/components/content-dialog';
import { QuestionsDialogGc } from './components/questions-dialog-gc';
import { GlycemicControlDashboard } from './components/glycemic-control-dashboard';

export function TeacherGlycemicControlView({ experiment }: { experiment: ExperimentDataTypes }) {
  return (
    <>
      <ExperimentControlRoomHeader experiment={experiment} />
      <section className="mb-16 flex flex-col gap-8 lg:flex-row">
        <ControlPanel experimentId={experiment._id} status={experiment.status}>
          <>
            <ContentDialog content={GLYCEMIC_CONTROL_DEFAULT_DATA.content} />
            <QuestionsDialogGc />
          </>
        </ControlPanel>
        <GlycemicControlDashboard experiment={experiment} />
      </section>
    </>
  );
}
