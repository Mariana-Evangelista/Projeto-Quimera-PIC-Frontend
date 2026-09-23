import { ExperimentsMap } from '@/constants/experiments-map';
import { ExperimentAccess } from '@/features/experiment-access';

export interface ExperimentFormProps {
  params: Promise<{
    slug: ExperimentsMap;
  }>;
}

export const metadata = {
  title: 'Acessar Experimento | Quimera',
};

export default function ExperimentForm({ params }: ExperimentFormProps) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <ExperimentAccess params={params} />
    </main>
  );
}
