import { NavBar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TeacherData } from '@/components/user/teacher-data';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
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
            <TeacherData />
          </Suspense>
        }
      />
      <main className="mx-5 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
