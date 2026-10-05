import { NavBar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { GetTeacherDataService } from '@/features/teacher-access/services/get-teacher-data';
import { TeacherData } from '@/components/layout/user/teacher-data';

export default async function DefaultLayout({ children }: { children: React.ReactNode }) {
  const data = await GetTeacherDataService();
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
            <TeacherData data={data} />
          </Suspense>
        }
      />
      <main className="mx-5 flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
