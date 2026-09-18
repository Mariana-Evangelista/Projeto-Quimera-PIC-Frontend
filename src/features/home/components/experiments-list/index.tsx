import { EXPERIMENTS_LIST_DATA } from '@/constants/experiments-list-data';
import { ExperimentCard } from './experiment-card';

export function ExperimentsList() {
  const experiments = EXPERIMENTS_LIST_DATA;

  return (
    <section className="my-16 flex flex-col items-center justify-center gap-8 md:flex-row">
      {experiments.map((experiment) => (
        <ExperimentCard key={experiment.slug} experiment={experiment} />
      ))}
    </section>
  );
}
