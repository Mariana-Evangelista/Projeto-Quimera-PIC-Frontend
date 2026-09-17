import { FaUser } from 'react-icons/fa6';

interface UserProps {
  name: string;
  description: string;
}

export function User({ name, description }: UserProps) {
  return (
    <div className="flex min-w-40 items-center gap-4 text-start text-sm">
      <div className="bg-muted text-muted-foreground/60 flex h-9 w-9 items-center justify-center rounded-full">
        <FaUser size={24} />
      </div>
      <div>
        <p className="font-semibold">Olá, {name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
