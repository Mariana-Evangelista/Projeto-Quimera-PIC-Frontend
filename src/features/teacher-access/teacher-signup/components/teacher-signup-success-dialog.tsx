'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export function TeacherSignupSuccessDialog() {
  return (
    <Dialog>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center justify-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center text-lg">Cadastro realizado com sucesso!</DialogTitle>
          <DialogDescription className="text-center">
            Sua conta foi criada. Faça login para iniciar seus experimentos.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-24">
          <Button onClick={() => redirect('/login')} className="w-full cursor-pointer">
            Faça Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
