import { TeacherExperiment } from '@/features/teacher-experiment';

export interface TeacherExperimentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Experimento | Quimera',
};

export default async function TeacherExperimentPage({ params }: TeacherExperimentPageProps) {
  return <TeacherExperiment params={params} />;
}
