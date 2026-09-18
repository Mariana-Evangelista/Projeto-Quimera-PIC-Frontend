import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';

export function ExperimentErrorRoom({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <LogoQuimera className="text-destructive border-border rounded-full border text-7xl sm:text-8xl" />
      <div className="text-center">
        <h2 className="text-destructive text-lg font-semibold sm:text-xl">Algo deu errado!</h2>
        <p className="text-muted-foreground text-sm sm:text-base">{message}</p>
      </div>
    </div>
  );
}
