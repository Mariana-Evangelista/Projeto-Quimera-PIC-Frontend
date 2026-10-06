'use client';
import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <LogoQuimera className="text-primary border-border rounded-full border text-7xl sm:text-8xl" />
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold sm:text-xl">Página não encontrada</h2>
          <p className="text-muted-foreground text-sm">
            A página que você procura não existe ou foi movida.
          </p>
        </div>
        <Button variant="default" className="cursor-pointer" asChild>
          <Link href="/">Voltar para a Home</Link>
        </Button>
      </div>
    </main>
  );
}