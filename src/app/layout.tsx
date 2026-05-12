import './globals.css';
import { Poppins } from 'next/font/google';
import { NavBar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Quimera',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex min-h-full flex-col text-gray-700 antialiased">
        <NavBar />
        <main className="mx-40 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
