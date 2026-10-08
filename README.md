# Quimera

<!-- Substitua este comentário pela imagem final do mockup quando ela estiver pronta. -->
<p align="center">
  <img src="./docs/mockup-quimera.png" alt="Mockup da plataforma Quimera" width="900" />
</p>

<p align="center">
  Plataforma interativa para apoiar o ensino de Fisiologia Animal na graduação em Medicina Veterinária.
</p>

<p align="center">
  <a href="https://quimera.mevangelista.com">Acessar a aplicação</a>
  ·
  <a href="https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-2024">Repositório do backend</a>
</p>

<!-- Substitua este bloco pelo GIF ou vídeo de demonstração quando o material estiver pronto. -->

## Demonstração

> **GIF ou vídeo em breve:** adicione aqui uma gravação curta mostrando a criação de um experimento pelo professor, a entrada dos alunos com o PIN e a liberação dos resultados.
>
> Sugestão de arquivo: `docs/demo-quimera.gif` ou um link para um vídeo hospedado.

![Demonstração do funcionamento do Quimera](./docs/demo-quimera.gif)

## Sobre o projeto

O **Quimera** foi criado para o **PIC 2024 (Projeto de Iniciação Científica)** do **Centro Universitário Barão de Mauá**, em parceria com o curso de Medicina Veterinária.

Uma versão inicial do projeto foi apresentada a uma banca especializada em 2025. Em 2026, a plataforma passou por uma revitalização que incluiu correção de bugs, melhorias de UI e responsividade, novas funcionalidades e publicação em produção.

O objetivo do Quimera é **dinamizar e tornar mais leve o aprendizado de Fisiologia Animal**, promovendo uma experiência colaborativa entre professor e alunos durante a aula.

## Como funciona

O Quimera foi pensado para ser utilizado em sala de aula, em um fluxo simples e colaborativo:

1. O professor acessa a plataforma e cria um dos experimentos disponíveis.
2. A plataforma gera um **PIN público de acesso**, que é compartilhado com a turma.
3. Os alunos entram na sala de forma anônima, sem autenticação, evitando a coleta de dados pessoais e de RA.
4. O professor controla quando a turma pode começar a enviar respostas, garantindo tempo para que todos acessem a sala.
5. Durante a atividade, as respostas são sincronizadas em tempo real para a sala do experimento.
6. Ao final, o professor libera os resultados e os gráficos para a turma.
7. Os resultados servem como ponto de partida para uma discussão em sala, permitindo identificar dúvidas, dificuldades e oportunidades para ajustar o ensino.

## Experimentos disponíveis

### Queda de Água Corporal

Explora como a perda de água afeta o organismo dos animais e apresenta os mecanismos fisiológicos envolvidos na manutenção do equilíbrio hídrico.

### Controle Glicêmico

Aborda a atuação dos hormônios na regulação da glicose sanguínea e os processos relacionados ao diagnóstico do Diabetes Mellitus.

## Funcionalidades

### Para professores

- Cadastro e autenticação de professores.
- Criação de experimentos a partir de modelos predefinidos.
- Gerenciamento de experimentos e informações da turma.
- Sala de controle do experimento.
- Controle do status da atividade e do envio de respostas.
- Liberação dos resultados para os alunos.
- Visualização de respostas e gráficos em tempo real.
- Consulta e filtragem dos experimentos criados.

### Para alunos

- Entrada por PIN público.
- Participação anônima, sem necessidade de criar uma conta.
- Sala de espera enquanto o professor organiza a atividade.
- Resposta às questões do experimento.
- Acompanhamento dos resultados após a liberação pelo professor.
- Interface responsiva para uso em diferentes tamanhos de tela.

## Links

- **Aplicação em produção:** [quimera.mevangelista.com](https://quimera.mevangelista.com)
- **Backend:** [Mariana-Evangelista/Projeto-Quimera-PIC-2024](https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-2024)

## Tecnologias

- [Next.js](https://nextjs.org/) 16 com App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) e [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/) e [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest) e TanStack Table
- [Socket.IO Client](https://socket.io/), para comunicação em tempo real
- [Recharts](https://recharts.org/), para visualização dos resultados
- [Playwright](https://playwright.dev/), para testes end-to-end
- [Vercel Analytics](https://vercel.com/analytics) e Speed Insights

## Arquitetura do frontend

O frontend utiliza uma organização orientada a funcionalidades, separando as áreas principais da aplicação:

```text
src/
├── app/                         # Rotas e layouts do Next.js
├── components/                  # Componentes compartilhados e UI
├── constants/                   # Mapas e dados dos experimentos
├── features/
│   ├── experiment/              # Experiência do aluno
│   ├── experiment-access/       # Entrada por PIN
│   ├── experiment-charts/       # Gráficos de resultados
│   ├── home/                    # Página inicial
│   ├── teacher-access/          # Login e cadastro do professor
│   ├── teacher-analytics/       # Consulta dos experimentos
│   ├── teacher-experiment/      # Sala de controle do professor
│   └── teacher-experiment-manage/ # Criação, edição e exclusão
├── lib/                         # Cliente HTTP e conexão Socket.IO
└── types/                       # Tipos compartilhados
```

A comunicação entre as salas de experimento e o backend utiliza **Socket.IO**, permitindo atualizar o estado da atividade e os gráficos sem a necessidade de recarregar a página.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm
- Backend do Quimera em execução ou uma instância acessível

## Instalação e execução local

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-Frontend.git
cd Projeto-Quimera-PIC-Frontend
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL HTTP da API do backend
API_BASE_URL=http://localhost:8000

# URL base do Socket.IO
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# Timeout das requisições em milissegundos (opcional)
API_TIMEOUT_MS=30000
```

Em seguida, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

> Em produção, `API_BASE_URL` deve utilizar HTTPS. As variáveis relacionadas a segredos e cookies devem ser configuradas no ambiente de execução e nunca devem ser versionadas.

## Scripts disponíveis

| Comando                   | Descrição                                              |
| ------------------------- | ------------------------------------------------------ |
| `npm run dev`             | Inicia o servidor de desenvolvimento.                  |
| `npm run build`           | Gera o build de produção.                              |
| `npm run start`           | Inicia a aplicação em modo produção.                   |
| `npm run lint`            | Executa o ESLint.                                      |
| `npm run lint:fix`        | Corrige automaticamente problemas possíveis do ESLint. |
| `npm run format`          | Formata os arquivos com Prettier.                      |
| `npm run format:check`    | Verifica a formatação sem alterar arquivos.            |
| `npm run test:e2e`        | Executa todos os testes end-to-end com Playwright.     |
| `npm run test:e2e:smoke`  | Executa os testes E2E marcados como smoke.             |
| `npm run test:e2e:ui`     | Abre a interface do Playwright.                        |
| `npm run test:e2e:debug`  | Executa os testes em modo de depuração.                |
| `npm run test:e2e:report` | Abre o relatório dos testes E2E.                       |

## Testes end-to-end

O projeto possui uma configuração isolada para testes E2E, com backend, MongoDB e portas próprias. Para utilizá-la:

```bash
cp e2e/.env.e2e.example e2e/.env.e2e
# Edite e2e/.env.e2e e preencha os segredos de teste

npm run e2e:backend:up
npm run e2e:wait-for-api
npm run test:e2e:smoke
npm run e2e:backend:down
```

A configuração de testes utiliza uma instância separada do MongoDB e não deve compartilhar dados com desenvolvimento ou produção. Consulte [`e2e/README.md`](./e2e/README.md) para detalhes sobre variáveis, isolamento e execução em CI.

## Contexto acadêmico

O Quimera integra tecnologia e metodologias ativas de aprendizagem para aproximar os conceitos de Fisiologia Animal da prática em sala de aula. A dinâmica de respostas anônimas e resultados compartilhados favorece a participação da turma e oferece ao professor uma visão rápida das principais dificuldades de aprendizagem.

## Autoria

Projeto desenvolvido por **Mariana Evangelista** para o PIC 2024 do Centro Universitário Barão de Mauá, em parceria com o curso de Medicina Veterinária.
