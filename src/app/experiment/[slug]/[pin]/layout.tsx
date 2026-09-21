import { Footer } from '@/components/layout/footer';
import { NavBar } from '@/components/layout/navbar';
import { Suspense } from 'react';
import { StudentData } from '@/components/user/student-data';

export default function ExperimentsPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <NavBar
        currentUser={
          <Suspense fallback={'loading...'}>
            <StudentData />
          </Suspense>
        }
      />
      <main className="mx-auto w-full flex-1 sm:max-w-6xl">{children}</main>
      <Footer />
    </div>
  );
}
