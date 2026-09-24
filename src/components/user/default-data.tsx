import Link from 'next/link';
import { Button } from '../ui/button';

export function DefaultData() {
  return (
    <div className="flex items-center gap-5">
      <p className="text-xs sm:text-sm">É professor?</p>
      <Link href={`/login`} passHref>
        <Button variant="secondary" className="cursor-pointer text-xs sm:text-sm">
          Faça Login
        </Button>{' '}
      </Link>
    </div>
  );
}
