import { ExperimentsList, Header } from '@/features/home';

export const metadata = {
  title: 'Quimera',
};

export default function Home() {
  return (
    <>
      <Header />
      <ExperimentsList />
    </>
  );
}
