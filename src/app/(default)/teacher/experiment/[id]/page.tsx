export interface TeacherExperimentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Experimento | Quimera',
};

export default async function TeacherExperimentPage({ params }: TeacherExperimentPageProps) {
  const { id } = await params;
  return <h1>{id}</h1>;
}
