import { ExperimentFormProps } from '@/app/experiment/[slug]/page';
import { ExperimentAccessCard } from './components/experiment-access-card';
import { EXPERIMENTS_MAP } from '@/constants/experiments-map';
import { notFound } from 'next/navigation';

export async function ExperimentAccess({ params }: ExperimentFormProps) {
  const { slug } = await params;

  if (!EXPERIMENTS_MAP.includes(slug)) return notFound();

  return <ExperimentAccessCard />;
}
