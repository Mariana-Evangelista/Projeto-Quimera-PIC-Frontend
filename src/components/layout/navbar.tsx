import Logo from '@/assets/LogoQuimeraSymbol.svg';
import { Button } from '../ui/button';

export function NavBar() {
  return (
    <nav className="text-light bg-primary/80 flex items-center justify-between px-3 py-2 md:px-10">
      <Logo className="text-background text-6xl" />

      <div className="flex items-center gap-5">
        <p className="text-xs sm:text-sm">É professor?</p>
        <Button variant="secondary" className="cursor-pointer text-xs sm:text-sm">
          Faça Login
        </Button>
      </div>
    </nav>
  );
}
