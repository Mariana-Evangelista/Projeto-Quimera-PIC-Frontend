import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface usePathnameNavigationProps {
  name: string;
  value: 'true' | 'false';
}

export function usePathnameNavigation({ name, value }: usePathnameNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const startPathnameNavigation = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return { startPathnameNavigation, isPending };
}
