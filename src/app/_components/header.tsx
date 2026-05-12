import HomeImage from '@/assets/art/HomeImageQuimera.png';
import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';

export function Header() {
  return (
    <header className="my-10 flex items-center justify-center gap-8">
      <div className="text-center text-lg">
        <h1 className="text-6xl font-semibold">
          Seja bem-vindo(a) ao <br />
          <strong className="text-green-500">QUIMERA</strong>
        </h1>
        <p className="my-8">
          Somos uma plataforma que permite a criação de <strong>experimentos interativos</strong>{' '}
          para aulas de ciências em
          <strong> medicina veterinária</strong>. Através dela, professores podem criar experimentos
          e alunos podem interagir com eles em tempo real.
        </p>

        <p>Escolha seu experimento e teste seus conhecimentos!</p>

        <span className="mt-4 flex justify-center gap-2">
          <FaPaw />
          <FaPaw />
          <FaPaw />
        </span>
      </div>
      <Image src={HomeImage} alt="Gato e cachorro juntos" className="max-w-1/3" priority={true} />
    </header>
  );
}
