import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';
import { Spinner } from '@/components/ui/spinner';

export default function DefaultLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <LogoQuimera className="text-primary border-border rounded-full border text-7xl sm:text-8xl" />
        <div className="text-center">
          <h2 className="text-muted-foreground text-lg font-semibold sm:text-xl">Carregando...</h2>
        </div>
        <Spinner className="text-muted-foreground/30 mt-4 h-6 w-6" />
      </div>
    </main>
  );
}
