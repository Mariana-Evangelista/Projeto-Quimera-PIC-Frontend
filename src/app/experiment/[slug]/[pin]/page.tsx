import { ExperimentsMap } from '@/constants/experiments-map';
import { ExperimentRender } from '@/features/experiment';

export type StartExperimentRoomType = {
  start_experiment_room: 'true' | 'false';
};

export interface ExperimentPageProps {
  params: Promise<{
    slug: ExperimentsMap;
    pin: string;
  }>;
  searchParams: Promise<StartExperimentRoomType>;
}

export const metadata = {
  title: 'Experimento Queda de Água Corporal | Quimera',
};

export default async function ExperimentPage({ params, searchParams }: ExperimentPageProps) {
  return (
    <div className="mx-5 sm:mx-8">
      <ExperimentRender params={params} searchParams={searchParams} />
    </div>
  );
}
