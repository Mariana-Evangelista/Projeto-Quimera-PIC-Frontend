import { getExperiments } from '../../services/get-experiments';
import { ExperimentCard } from './experiment-card';

export async function ExperimentList() {
  const experiments = await getExperiments();

  return (
    <section className="my-16 flex flex-col items-center justify-center gap-8 md:flex-row">
      {experiments.map((experiment) => (
        <ExperimentCard key={experiment.id} experiment={experiment} />
      ))}
    </section>
  );
}
