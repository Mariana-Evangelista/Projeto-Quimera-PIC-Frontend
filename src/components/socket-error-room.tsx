'use client';

import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';
import { AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocketErrorRoomProps {
  message: string;
  onReconnect: () => void;
}

export function SocketErrorRoom({ message, onReconnect }: SocketErrorRoomProps) {
  return (
    <main className="flex items-center justify-center px-4" data-testid="socket-error-room">
      <div className="flex flex-col items-center gap-3 text-center">
        <LogoQuimera className="text-destructive border-border rounded-full border text-7xl sm:text-8xl" />
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <AlertCircleIcon className="text-destructive h-5 w-5" />
            <h2 className="text-destructive text-lg font-semibold sm:text-xl">Algo deu errado!</h2>
          </div>
          <p className="text-muted-foreground max-w-lg text-sm sm:text-base">{message}</p>
        </div>
        <Button variant="destructive" className="mt-4 cursor-pointer" onClick={onReconnect}>
          Reconectar
        </Button>
      </div>
    </main>
  );
}
