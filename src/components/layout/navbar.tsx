import Image from 'next/image';
import Logo from '@/assets/LogoQuimeraSymbol.svg';
import { Button } from '../ui/button';

export function NavBar() {
  return (
    <nav className="text-light flex items-center justify-between bg-green-400 px-3 py-2 md:px-10">
      <Image src={Logo} alt="Brand logo" className="w-12 sm:w-16" />
      <div className="flex items-center gap-5">
        <p className="text-xs sm:text-sm">É professor?</p>
        <Button variant={'secondary'} className="cursor-pointer text-xs text-green-600 sm:text-sm">
          Faça Login
        </Button>
      </div>
    </nav>
  );
}
