import { Suspense } from 'react';
import { ExperimentList, Header } from '../features/home';

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback="Loading experiments...">
        <ExperimentList />
      </Suspense>
    </>
  );
}
