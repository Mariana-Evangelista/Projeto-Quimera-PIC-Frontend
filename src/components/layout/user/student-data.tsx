import { ExperimentAccessClaims } from '@/features/experiment-access/services/set-data-cookies';
import { DefaultData } from './default-data';
import { FaUser } from 'react-icons/fa';

export async function StudentData({ student }: { student: ExperimentAccessClaims | null }) {
  if (!student) {
    return <DefaultData />;
  }

  return (
    <div className="flex min-w-40 items-center gap-4 text-end text-xs sm:text-start sm:text-sm">
      <div className="bg-muted text-muted-foreground/60 hidden h-9 w-9 items-center justify-center rounded-full sm:flex">
        <FaUser size={24} />
      </div>
      <div>
        <p className="font-semibold">Olá, {student.studentName}</p>
        <span>Turma {student.class}</span>
      </div>
    </div>
  );
}
