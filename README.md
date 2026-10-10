<div align="center">

# 🧪 Quimera

**Sala de aula interativa em tempo real para o ensino de Fisiologia Animal.**
O professor cria a sala, a turma entra com um PIN e as respostas viram gráficos ao vivo.

[**Ver em produção**](https://quimera.mevangelista.com) · [Repositório do backend](https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-2024)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-010101?logo=socketdotio&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)

</div>

---

## O problema

Fisiologia Animal é uma disciplina densa. Em aulas expositivas, o professor raramente sabe **onde** a turma está errando até a prova.

O Quimera transforma casos clínicos veterinários em uma atividade colaborativa: cada aluno responde no próprio dispositivo e o professor vê as dificuldades da turma **na hora**, para discutir e ajustar a aula.

## A história do projeto

**2024 · Origem.** O Quimera nasceu como projeto de Iniciação Científica (PIC) do Centro Universitário Barão de Mauá, em parceria com o curso de Medicina Veterinária, seu objetivo era deixar o aprendizado de Fisiologia Animal mais leve e participativo. Entrei no projeto com uma versão inicial que englobava somente o experimento **Queda de Água Corporal**, mas o professor me deu um desafio: "Faça tudo do zero, do seu jeito, e adicione um novo experimento"

**2025 · Banca.** Apresentação da minha versão para uma banca especializada.

**2026 · Revitalização e produção.** Retomei o projeto com um objetivo diferente: transformá-lo de protótipo acadêmico em um produto confiável, que um professor possa usar em sala sem medo de falhar, aplicando novas habilidades adquiridas ao longo do último ano. Isso significou: 
- Corrigir bugs e redesenhar a interface, com foco em **responsividade**
- Adicionar novas funcionalidades: edição e exclusão de experimentos, filtros na tabela de experimentos, painel de controle do professor que controla o status do experimento, atualizações em tempo real que conectam sala do experimento e professor.
- Escrever **testes end-to-end** e montar uma **pipeline que só publica o que passou nos testes**
- Publicar em **produção**, com domínio próprio e monitoramento de desempenho


## Como uma aula funciona

| # | Quem | O que acontece |
| :-: | --- | --- |
| 1 | Professor | Escolhe um experimento pronto e cria a sala. A plataforma gera um **PIN de 6 caracteres** |
| 2 | Alunos | Entram com o PIN, sem criar conta e sem informar RA. Aguardam em uma sala de espera |
| 3 | Professor | Quando todos entraram, **libera o envio de respostas** |
| 4 | Alunos | Leem o conteúdo, o caso clínico e respondem às questões |
| 5 | Professor | Acompanha as respostas chegando e os gráficos mudando **em tempo real** |
| 6 | Professor | **Libera os resultados**. Cada aluno vê gabarito e desempenho, e a turma discute os erros mais comuns |

Os dois "interruptores" do professor (envio e resultados) são uma decisão pedagógica: dão tempo para todos entrarem e permitem que os alunos troquem ideias antes de responder.

## Experimentos

| 💧 Queda de Água Corporal | 🧬 Controle Glicêmico |
| --- | --- |
| Como a perda de água afeta o organismo e quais mecanismos mantêm o equilíbrio hídrico. *(já existia na versão original)* | Como os hormônios regulam a glicose sanguínea e como se chega ao diagnóstico de Diabetes Mellitus, a partir de um caso clínico canino. *(adicionado na versão 2026)* |

## Funcionalidades

**Professor**
- Cadastro e login
- Criação, edição e exclusão de experimentos a partir de modelos prontos
- Tabela de experimentos com filtro e ordenação
- Sala de controle: status da atividade, liberação de envio e de resultados
- Dashboard em tempo real com gráficos e indicadores (total de respostas e pontuação média)

**Aluno**
- Entrada por PIN, sem conta e sem RA
- Sala de espera até o professor liberar a atividade
- Conteúdo didático e caso clínico em Markdown, seguido das questões
- Resultado individual (gabarito × resposta) e comparativo com a turma
- Interface responsiva, pensada para o celular em sala

## Desafios e decisões

### 🔐 Como proteger o sistema sem pedir login dos alunos?

Alunos precisam entrar rápido e sem dar dados pessoais, mas ninguém deve entrar na sala errada ou se passar por outra pessoa.

**Solução:** sessões em **cookies assinados com HMAC-SHA256**, usando Web Crypto, sem biblioteca externa. O cookie do aluno guarda nome, PIN e experimento, e o servidor só libera `/experiment/:slug/:pin` se o cookie bater com a URL. O professor usa o mesmo mecanismo, com um segredo próprio.

O token JWT do backend fica **dentro** do cookie `httpOnly` e só é usado no servidor. O cliente HTTP é `server-only`, então o JavaScript do navegador nunca toca no token.

### ⚡ Como manter várias telas sincronizadas?

O dashboard do professor e a sala dos alunos reagem a eventos do servidor a qualquer momento: queda de conexão, reconexão, sala errada, nova resposta.

**Solução:** uma **camada de socket genérica e tipada** (`SocketService<Join, Update, Rejected, Ack>`) com um `SocketManager` que mantém uma conexão por namespace. O estado de cada sala é uma **store externa** lida com `useSyncExternalStore`, sem `useEffect` espalhado para sincronizar estado. Eventos de outras salas são descartados, a entrada na sala usa *acknowledgement*, e a UI mostra um erro com botão de reconexão em vez de travar.

### 🎛️ Como evitar que o professor faça uma ação inválida no meio da aula?

Liberar resultados antes de abrir o envio, ou reabrir uma atividade encerrada, geraria dados inconsistentes na frente da turma inteira.

**Solução:** o ciclo de vida do experimento é uma **máquina de estados declarativa**: `Não iniciado → Em Progresso → Finalizado`. Cada estado define quais controles ficam habilitados, então o caminho inválido não existe na interface. A resposta é instantânea com `useOptimistic`.

### 🧱 Como crescer de 2 para N experimentos com o menor custo?

**Solução:** arquitetura **por feature** e um registro tipado. Adicionar um slug em `EXPERIMENTS_MAP` **quebra o build** até que os renderers de aluno e de professor existam (`as const` + `satisfies Record<ExperimentsMap, ComponentType>`). O conteúdo didático fica em arquivos Markdown, editável sem mexer em componentes.

### 🚦 Como ter confiança para publicar um sistema em uso?

**Solução:** suíte E2E com **Playwright** (mais de 20 cenários, Page Object Model e fixtures) rodando contra o **backend real e um MongoDB descartável** em Docker, com portas e banco isolados. O deploy para a Vercel só acontece se os testes passarem, no **mesmo commit** testado. O deploy automático da Vercel está desligado, então o pipeline é o único caminho até produção.

## Estrutura do Projeto

```text
src/
├── app/                          # Rotas, layouts e route handlers (App Router)
├── components/                   # Componentes compartilhados e primitivos de UI (shadcn)
├── constants/                    # Registro tipado de experimentos
├── features/                     # Organização por funcionalidade
│   ├── experiment/               # Experiência do aluno (sala, questões, resultados)
│   │   ├── shared/               #   Socket store, hooks, espera, erro, conteúdo
│   │   ├── body-water-loss/      #   Experimento completo e isolado
│   │   └── glycemic-control/     #   Experimento completo e isolado
│   ├── experiment-access/        # Entrada por PIN (action, schema, cookie)
│   ├── experiment-charts/        # Gráficos reutilizáveis (Recharts)
│   ├── teacher-access/           # Login e cadastro do professor
│   ├── teacher-analytics/        # Tabela de experimentos (TanStack Table)
│   ├── teacher-experiment/       # Sala de controle e dashboards em tempo real
│   └── teacher-experiment-manage/# Criar, editar e excluir
├── lib/
│   ├── api/                      # Cliente HTTP server-only, erros e config
│   ├── socket/                   # SocketService genérico + SocketManager
│   └── signed-cookies.ts         # HMAC-SHA256 com Web Crypto
├── proxy/                        # Guards de rota
└── proxy.ts                      # Entrada do proxy do Next.js
```


## Destaques técnicos

| Decisão | Por que importa |
| --- | --- |
| Cookies assinados (HMAC-SHA256) com Web Crypto | Autenticação sem biblioteca de JWT, `httpOnly`, rodando no runtime do proxy do Next.js |
| Token da API nunca chega ao navegador | Cliente HTTP `server-only`, com allowlist de headers e HTTPS obrigatório em produção |
| Socket.IO tipado + `useSyncExternalStore` | Tempo real com reconexão e tratamento de erro, sem estado duplicado |
| Máquina de estados para o ciclo da aula | Ações inválidas simplesmente não existem na interface |
| `as const` + `satisfies` no registro de experimentos | Experimento incompleto vira erro de compilação |
| E2E contra backend real em CI | Só vai para produção o que passou nos testes |
| Next.js 16 moderno | Server Actions, `useActionState`, `useOptimistic`, React Compiler e Cache Components |
| Mobile first | shadcn/ui + Radix, skeletons e estados de erro e vazio |

## Stack

**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui + Radix UI · React Hook Form + Zod 4 · TanStack Query + Table · Recharts · react-markdown

**Tempo real:** Socket.IO Client

**Qualidade:** Playwright (Page Object Model + fixtures) · ESLint · Prettier

**Infra:** GitHub Actions · Docker Compose (ambiente E2E) · Vercel (Analytics + Speed Insights)

**Backend** (repositório separado): API REST + Socket.IO + MongoDB

## Rodando localmente

**Requisitos:** Node.js 20.9+ e o [backend do Quimera](https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-2024) rodando.

```bash
git clone https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-Frontend.git
cd Projeto-Quimera-PIC-Frontend
npm install
```

Crie o arquivo `.env.local`:

```env
API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# Segredos de assinatura dos cookies (mínimo de 32 caracteres cada).
# Gere com: openssl rand -base64 48
TEACHER_ACCESS_TOKEN_SECRET=
EXPERIMENT_ACCESS_SECRET=
```

```bash
npm run dev   # http://localhost:3000
```

<details>
<summary><strong>Scripts disponíveis</strong></summary>

| Comando | Descrição |
| --- | --- |
| `npm run dev` / `build` / `start` | Desenvolvimento, build e execução em produção |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm run test:e2e` | Suíte E2E completa (Playwright) |
| `npm run test:e2e:smoke` | Apenas testes `@smoke` |
| `npm run test:e2e:ui` / `debug` / `report` | Modos interativo, depuração e relatório |
| `npm run e2e:backend:up` / `down` / `reset` / `logs` | Ambiente E2E isolado (API + MongoDB em Docker) |

</details>

Para rodar os testes E2E localmente, veja [`e2e/README.md`](./e2e/README.md).

## Autoria

Projeto original de Iniciação Científica (PIC 2024) do Centro Universitário Barão de Mauá. A versão atual do frontend, com o experimento de Controle Glicêmico, a nova interface, a mudança de tecnologias, os testes e o deploy, foi feita por **Mariana Evangelista**.
