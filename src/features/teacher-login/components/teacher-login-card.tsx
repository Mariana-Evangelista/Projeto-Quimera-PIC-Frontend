import { TeacherLoginForm } from './teacher-login-form';
import Image from 'next/image';
import LogoQuimera from '@/assets/LogoQuimera.png';

export function TeacherLoginCard() {
  return (
    <section className="sm:border-border w-full max-w-lg space-y-6 p-8 sm:rounded-xl sm:border sm:px-16 sm:shadow-md">
      <div className="flex w-full items-center justify-center">
        <Image
          src={LogoQuimera}
          alt="Logo da Plataforma Quimera"
          className="max-w-76"
          priority={true}
        />
      </div>

      <p className="pb-3 text-center text-sm">
        Acesse a área do professor para gerenciar experimentos e turmas.
      </p>

      <TeacherLoginForm />
    </section>
  );
}
