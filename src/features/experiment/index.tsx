import { ExperimentPageProps } from '@/app/experiment/[slug]/[pin]/page';
import { EXPERIMENTS_MAP } from '@/constants/experiments-map';
import { notFound } from 'next/navigation';
import { EXPERIMENT_RENDERERS } from './experiment-renderers';

export async function ExperimentRender({ params, searchParams }: ExperimentPageProps) {
  const { slug } = await params;

  const { start_experiment_room } = await searchParams;

  if (!EXPERIMENTS_MAP.includes(slug)) return notFound();

  const Render = EXPERIMENT_RENDERERS[slug];

  return <Render start_experiment_room={start_experiment_room} />;
}
