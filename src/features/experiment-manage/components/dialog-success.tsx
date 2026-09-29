'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircleIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface DialogSuccessProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function DialogSuccess({
  open,
  onOpenChange,
  title,
  description,
  children,
}: DialogSuccessProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center justify-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center text-lg">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-24">
          <DialogClose asChild>
            <Button>Fechar</Button>
          </DialogClose>

          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
