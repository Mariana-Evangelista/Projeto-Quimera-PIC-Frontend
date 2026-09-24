import { TeacherSignupForm } from './teacher-signup-form';
import LogoQuimera from '@/assets/LogoQuimeraSymbol.svg';

export function TeacherSignupCard() {
  return (
    <section className="sm:border-border w-full max-w-lg space-y-4 p-8 sm:rounded-xl sm:border sm:px-16 sm:shadow-md">
      <div className="text-primary/80 flex w-full items-center justify-center">
        <LogoQuimera className="text-8xl" />
        <h1 className="mt-3 text-4xl font-extrabold">Nova Conta</h1>
      </div>

      <p className="pb-3 text-center text-sm">
        Cadastre-se no portal Quimera e crie uma experiência didática e imersiva para os seus
        alunos.
      </p>

      <TeacherSignupForm />
    </section>
  );
}
