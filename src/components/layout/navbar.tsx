import Image from 'next/image';
import Logo from '@/assets/brand/LogoQuimeraSymbol.svg';
import { Button } from '../ui/button';

export function NavBar() {
  return (
    <header className="text-light flex items-center justify-between bg-green-400 px-10 py-2">
      <Image src={Logo} alt="Brand logo" className="w-16" />
      <div className="flex items-center gap-5">
        <p className="text-sm">É professor?</p>
        <Button variant={'secondary'} className="cursor-pointer text-green-600">
          Faça Login
        </Button>
      </div>
    </header>
  );
}
