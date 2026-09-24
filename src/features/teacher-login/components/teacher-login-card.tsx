import { TeacherLoginForm } from './teacher-login-form';

import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';

export function TeacherLoginCard() {
  return (
    <section className="sm:border-border w-full max-w-lg space-y-4 p-8 sm:rounded-xl sm:border sm:px-16 sm:shadow-md">
      <div className="text-primary/80 flex w-full items-center justify-center">
        <LogoQuimera className="text-8xl" />
        <h1 className="mt-3 text-4xl font-extrabold">Fazer Login</h1>
      </div>

      <p className="pb-3 text-center text-sm">
        Acesse a área do professor para gerenciar experimentos e turmas.
      </p>

      <TeacherLoginForm />
    </section>
  );
}
