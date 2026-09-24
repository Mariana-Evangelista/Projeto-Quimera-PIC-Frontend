import { User } from '@/components/user/user';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from '@/features/experiment-access/services/set-data-cookies';
import { getSignedCookieAccess } from '@/utils/get-signed-cookies';
import { DefaultData } from './default-data';

export async function StudentData() {
  const student = await getSignedCookieAccess<ExperimentAccessClaims>(
    EXPERIMENT_ACCESS_COOKIE,
    'EXPERIMENT_ACCESS_SECRET'
  );

  if (!student) {
    return <DefaultData />;
  }

  return <User name={student.studentName} description={'Turma: ' + student?.class} />;
}
