'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface HandlerConfirmNavigationProps {
  children: ReactNode;
}

const ROUTES_WITH_CONFIRMATION = ['/experiment'];

export function HandlerConfirmNavigation({ children }: HandlerConfirmNavigationProps) {
  const pathname = usePathname();

  const needsConfirmation = ROUTES_WITH_CONFIRMATION.some((route) => pathname.startsWith(route));

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!needsConfirmation) return;

    const confirmed = window.confirm(
      'Deseja realmente sair desta página? O progresso será perdido.'
    );
    if (!confirmed) {
      e.preventDefault();
    }
  }

  return (
    <Link href="/" onClick={handleClick}>
      {children}
    </Link>
  );
}
