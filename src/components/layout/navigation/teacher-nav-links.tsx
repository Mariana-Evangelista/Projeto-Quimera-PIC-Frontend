import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TeacherNavLinks() {
  const path = usePathname();
  return (
    <div className="hidden space-x-16 sm:block">
      <Link
        href={'/'}
        className={cn('hover:text-secondary text-sm', path === '/' && 'text-secondary/80')}
      >
        Home
      </Link>
      <Link
        href={'/teacher/analytics'}
        className={cn(
          'hover:text-secondary text-sm',
          path === '/teacher/analytics' && 'text-secondary/80'
        )}
      >
        Área do Professor
      </Link>
    </div>
  );
}
