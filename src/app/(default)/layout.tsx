import { NavBar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <NavBar />
      <main className="mx-5 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
