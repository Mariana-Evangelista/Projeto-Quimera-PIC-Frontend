import { Button } from '@/components/ui/button';
import { ClipboardPlus } from 'lucide-react';

export function TeacherAnalyticsHeader() {
  return (
    <header className="mt-10 mb-16 flex w-full flex-col-reverse items-center justify-center gap-8 sm:flex-row sm:justify-between">
      <section className="space-y-3 sm:space-y-8 lg:max-w-xl">
        <h1 className="text-primary text-[2.5rem] font-semibold sm:text-5xl lg:text-6xl">
          Área do Professor
        </h1>

        <p className="max-w-lg text-sm md:text-base">
          Bem vindo a área do professor! <br /> Inicie um novo experimento com seus alunos ou
          gerencie seus experimentos antigos. Aqui o aprendizado é real e dinâmico.
        </p>

        <Button className="cursor-pointer">
          <ClipboardPlus />
          Novo Experimento
        </Button>
      </section>
      <section className="bg-border h-72 w-72 rounded-full"></section>
    </header>
  );
}
