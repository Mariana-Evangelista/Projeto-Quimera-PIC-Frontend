import Logo from '@/assets/LogoQuimeraSymbol.svg';
import { ReactNode } from 'react';
import { HandlerConfirmNavigation } from './handler-confirm-navigation';

interface NavbarProps {
  currentUser?: ReactNode | null;
}

export function NavBar({ currentUser }: NavbarProps) {
  return (
    <nav className="text-light bg-primary/80 flex items-center justify-between px-3 py-2 md:px-10">
      <HandlerConfirmNavigation>
        <Logo className="text-background text-6xl" />
      </HandlerConfirmNavigation>
      <div className="flex items-center gap-5">{currentUser}</div>
    </nav>
  );
}
