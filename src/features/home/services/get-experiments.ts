import { MOCK_EXPERIMENTS } from '../mocks/experiments';

export async function getExperiments() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return MOCK_EXPERIMENTS;
}
