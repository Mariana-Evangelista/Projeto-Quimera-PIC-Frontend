import { Footer } from '@/components/layout/footer';
import { NavBar } from '@/components/layout/navbar';
import { Suspense } from 'react';
import { StudentData } from '@/components/layout/user/student-data';
import { Skeleton } from '@/components/ui/skeleton';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from '@/features/experiment-access/services/set-data-cookies';
import { getSignedCookieAccess } from '@/utils/get-signed-cookies';

export default async function ExperimentsPageLayout({ children }: { children: React.ReactNode }) {
  const student = await getSignedCookieAccess<ExperimentAccessClaims>(
    EXPERIMENT_ACCESS_COOKIE,
    'EXPERIMENT_ACCESS_SECRET'
  );

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <NavBar
        currentUser={
          <Suspense
            fallback={
              <div className="flex items-center gap-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-8 w-18 rounded-sm" />
              </div>
            }
          >
            <StudentData student={student} />
          </Suspense>
        }
      />
      <main className="mx-auto w-full flex-1 sm:max-w-6xl">{children}</main>
      <Footer />
    </div>
  );
}
