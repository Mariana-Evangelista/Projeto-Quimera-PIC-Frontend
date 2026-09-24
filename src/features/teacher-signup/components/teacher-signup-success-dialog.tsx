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
import { useState } from 'react';

export function TeacherSignupSuccessDialog() {
  const [open, setOpen] = useState(true);

  const handleOk = () => {
    setOpen(false);
    window.location.replace('/login');
  };

  return (
    <Dialog open={open}>
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
          <Button onClick={handleOk} className="w-full cursor-pointer">
            Faça Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
