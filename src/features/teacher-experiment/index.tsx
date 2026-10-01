import { TeacherExperimentPageProps } from '@/app/(default)/teacher/experiment/[id]/page';
import { GetExperimentsByIdService } from './shared/services/get-experiment-by-id-service';
import { TEACHER_EXPERIMENT_RENDERERS } from './teacher-experiment-view-renderers';

export async function TeacherExperiment({ params }: TeacherExperimentPageProps) {
  const { id } = await params;
  const experiment = await GetExperimentsByIdService(id);

  const Render = TEACHER_EXPERIMENT_RENDERERS[experiment.type];

  return <Render experiment={experiment} />;
}
