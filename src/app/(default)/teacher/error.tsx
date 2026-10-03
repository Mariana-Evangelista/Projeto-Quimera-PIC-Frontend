'use client';
import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/lib/api/errors/api-error';

interface ErrorProps {
  error: Error | ApiError;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const getErrorMessage = () => {
    if (error instanceof ApiError) {
      return error.error.message;
    }

    return error?.message || 'Erro desconhecido, entre em contato com o suporte.';
  };
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <LogoQuimera className="text-destructive border-border rounded-full border text-7xl sm:text-8xl" />
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold sm:text-xl">Falha ao carregar dados</h2>
          <p className="text-muted-foreground text-sm">{getErrorMessage()}</p>
        </div>
        <Button variant="destructive" className="cursor-pointer" onClick={reset}>
          Tentar Novamente
        </Button>
      </div>
    </main>
  );
}
