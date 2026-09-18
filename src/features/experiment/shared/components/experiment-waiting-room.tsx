import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';
import { Spinner } from '@/components/ui/spinner';

export function ExperimentWaitingRoom({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <LogoQuimera className="text-primary border-border rounded-full border text-7xl sm:text-8xl" />
      <div className="text-center">
        <h2 className="text-lg font-semibold sm:text-xl">Aguarde...</h2>
        <p className="text-muted-foreground text-sm sm:text-base">{message}</p>
      </div>
      <Spinner className="text-primary mt-4 h-6 w-6" />
    </div>
  );
}
