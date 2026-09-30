import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { AlertCircleIcon, LucideIcon } from 'lucide-react';
import { DialogTitle } from 'radix-ui/dialog';
import { ReactNode } from 'react';
import { Alert, AlertDescription } from './ui/alert';

interface DialogConfirmActionProps {
  variant?: 'default' | 'success' | 'destructive';
  Icon?: LucideIcon;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  children?: ReactNode;
  title: string;
  description: string;
  error?: string;
  isPending?: boolean;
  onConfirmAction: () => void;
}

export function DialogConfirmAction({
  variant = 'default',
  Icon,
  open,
  setOpen,
  children,
  title,
  description,
  error,
  isPending,
  onConfirmAction,
}: DialogConfirmActionProps) {
  const variants = cva('', {
    variants: {
      button: {
        default: 'bg-blue-400 hover:bg-blue-300',
        success: 'bg-primary hover:bg-primary/70',
        destructive: 'bg-destructive hover:bg-destructive/70',
      },
      text: {
        default: 'text-blue-400',
        success: 'text-primary',
        destructive: 'text-destructive',
      },
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="grid gap-2 text-base">
            {Icon && <Icon size={18} className={cn(variants({ text: variant }))} />}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {error && error.length > 0 && (
          <Alert variant="destructive" className="text-start">
            <AlertCircleIcon className="mr-2 h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending} className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={() => onConfirmAction()}
            disabled={isPending}
            className={cn('cursor-pointer', variants({ button: variant }))}
          >
            {isPending && <Spinner />}
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
