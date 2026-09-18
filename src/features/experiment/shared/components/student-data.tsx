import { User } from '@/components/user';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from '@/features/experiment-access/services/set-data-cookies';
import { getSignedCookieAccess } from '@/utils/get-signed-cookies';

export async function StudentData() {
  const student = await getSignedCookieAccess<ExperimentAccessClaims>(
    EXPERIMENT_ACCESS_COOKIE,
    'EXPERIMENT_ACCESS_SECRET'
  );

  if (student) {
    return <User name={student.studentName} description={'Turma: ' + student?.class} />;
  }
}
