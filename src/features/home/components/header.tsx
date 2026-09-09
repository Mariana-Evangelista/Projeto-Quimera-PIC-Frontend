import HomeImage from '../assets/HomeImageQuimera.png';
import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';

export function Header() {
  return (
    <header className="my-10 flex flex-col items-center justify-center gap-8">
      <Image
        src={HomeImage}
        alt="Gato e cachorro juntos"
        className="w-full max-w-80"
        priority={true}
      />
      <section className="w-full max-w-3xl text-center">
        <h1 className="text-lg font-light sm:text-xl">
          Seja bem-vindo(a) ao <br />
          <strong className="text-primary text-5xl font-semibold sm:text-6xl">QUIMERA</strong>
        </h1>

        <div className="text-sm max-[500px]:text-start sm:text-base">
          <p className="my-8">
            Somos uma plataforma que permite a criação de <strong>experimentos interativos</strong>{' '}
            para aulas de fisiologia da graduação em
            <strong> medicina veterinária</strong>. Através do nosso sistema, professores podem
            criar experimentos com um pin único de acesso e alunos podem interagir em tempo real.
          </p>

          <p>Escolha seu experimento e teste seus conhecimentos!</p>
        </div>

        <span className="mt-5 flex justify-center gap-2">
          <FaPaw />
          <FaPaw />
          <FaPaw />
        </span>
      </section>
    </header>
  );
}
