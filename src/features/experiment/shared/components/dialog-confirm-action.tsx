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
import { DialogTitle } from 'radix-ui/dialog';
import { ReactNode } from 'react';

interface DialogConfirmActionProps {
  children: ReactNode;
  title: string;
  description: string;
  onConfirmAction: () => void;
}

export function DialogConfirmAction({
  children,
  title,
  description,
  onConfirmAction,
}: DialogConfirmActionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={onConfirmAction}
            className="cursor-pointer bg-blue-400 hover:bg-blue-300"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
