import { getExperiments } from '../../services/get-experiments';
import { ExperimentCard } from './experiment-card';

export async function ExperimentList() {
  const experiments = await getExperiments();

  return (
    <section className="grid grid-cols-1 p-4 md:grid-cols-2">
      {experiments.map((experiment) => (
        <ExperimentCard key={experiment.id} />
      ))}
    </section>
  );
}
