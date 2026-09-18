import Logo from '@/assets/LogoQuimeraSymbol.svg';
import { Button } from '../ui/button';
import { ReactNode } from 'react';

interface NavbarProps {
  currentUser?: ReactNode;
}

export async function NavBar({ currentUser }: NavbarProps) {
  return (
    <nav className="text-light bg-primary/80 flex items-center justify-between px-3 py-2 md:px-10">
      <Logo className="text-background text-6xl" />

      <div className="flex items-center gap-5">
        {currentUser ?? (
          <>
            <p className="text-xs sm:text-sm">É professor?</p>
            <Button variant="secondary" className="cursor-pointer text-xs sm:text-sm">
              Faça Login
            </Button>{' '}
          </>
        )}
      </div>
    </nav>
  );
}
