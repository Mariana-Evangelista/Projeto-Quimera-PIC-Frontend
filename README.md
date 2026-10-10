<div align="center">

# 🧪 Quimera

**A real-time interactive classroom for teaching Animal Physiology.**
The teacher creates a room, the class joins with a PIN, and the answers turn into live charts.

[**See it in production**](https://quimera.mevangelista.com) · [Backend repository](https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-2024)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-010101?logo=socketdotio&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)

</div>

---

## The problem

Animal Physiology is a dense subject. In lecture-style classes, the teacher rarely knows **where** the class is going wrong until the exam.

Quimera turns veterinary clinical cases into a collaborative activity: each student answers on their own device, and the teacher sees the class's difficulties **right away**, so they can discuss them and adjust the lesson.

## Project history

**2024 · Origin.** Quimera started as a Scientific Initiation (PIC) project at Centro Universitário Barão de Mauá, in partnership with the Veterinary Medicine program. Its goal was to make learning Animal Physiology lighter and more participatory. I joined the project with an initial version that covered only the **Body Water Loss** experiment, but the professor gave me a challenge: "Build everything from scratch, your own way, and add a new experiment."

**2025 · Review panel.** I presented my version to a specialized panel.

**2026 · Revitalization and production.** I came back to the project with a different goal: turning it from an academic prototype into a reliable product that a teacher can use in class without fear of it failing, applying new skills I picked up over the past year. That meant:
- Fixing bugs and redesigning the interface, with a focus on **responsiveness**
- Adding new features: editing and deleting experiments, filters on the experiments table, a teacher control panel that manages the experiment status, and real-time updates that connect the experiment room and the teacher
- Writing **end-to-end tests** and building a **pipeline that only publishes what passed the tests**
- Shipping to **production**, with a custom domain and performance monitoring


## How a class works

| # | Who | What happens |
| :-: | --- | --- |
| 1 | Teacher | Picks a ready-made experiment and creates the room. The platform generates a **6-character PIN** |
| 2 | Students | Join with the PIN, with no account and no student ID. They wait in a waiting room |
| 3 | Teacher | Once everyone has joined, **releases answer submission** |
| 4 | Students | Read the content and the clinical case, then answer the questions |
| 5 | Teacher | Watches answers arrive and the charts change **in real time** |
| 6 | Teacher | **Releases the results**. Each student sees the answer key and their performance, and the class discusses the most common mistakes |

The teacher's two "switches" (submission and results) are a pedagogical decision: they give everyone time to join and let students exchange ideas before answering.

## Experiments

| 💧 Body Water Loss | 🧬 Glycemic Control |
| --- | --- |
| How water loss affects the body and which mechanisms keep fluid balance. *(already existed in the original version)* | How hormones regulate blood glucose and how Diabetes Mellitus is diagnosed, based on a canine clinical case. *(added in the 2026 version)* |

## Features

**Teacher**
- Sign-up and login
- Create, edit, and delete experiments from ready-made templates
- Experiments table with filtering and sorting
- Control room: activity status, release of submission and of results
- Real-time dashboard with charts and indicators (total answers and average score)

**Student**
- Join by PIN, with no account and no student ID
- Waiting room until the teacher releases the activity
- Educational content and clinical case in Markdown, followed by the questions
- Individual result (answer key × student's answer) and comparison with the class
- Responsive interface, designed for phones in the classroom

## Challenges and decisions

### 🔐 How do you protect the system without asking students to log in?

Students need to get in quickly without giving personal data, but nobody should end up in the wrong room or impersonate someone else.

**Solution:** sessions in **cookies signed with HMAC-SHA256**, using Web Crypto, with no external library. The student's cookie stores name, PIN, and experiment, and the server only serves `/experiment/:slug/:pin` if the cookie matches the URL. The teacher uses the same mechanism, with a separate secret.

The backend's JWT token lives **inside** the `httpOnly` cookie and is only used on the server. The HTTP client is `server-only`, so the browser's JavaScript never touches the token.

### ⚡ How do you keep several screens in sync?

The teacher's dashboard and the students' room react to server events at any moment: dropped connections, reconnections, wrong room, new answers.

**Solution:** a **generic, typed socket layer** (`SocketService<Join, Update, Rejected, Ack>`) with a `SocketManager` that keeps one connection per namespace. Each room's state is an **external store** read with `useSyncExternalStore`, with no scattered `useEffect` calls to sync state. Events from other rooms are discarded, joining a room uses an *acknowledgement*, and the UI shows an error with a reconnect button instead of freezing.

### 🎛️ How do you stop the teacher from taking an invalid action mid-class?

Releasing results before opening submission, or reopening a finished activity, would create inconsistent data in front of the whole class.

**Solution:** the experiment lifecycle is a **declarative state machine**: `Not started → In Progress → Finished`. Each state defines which controls are enabled, so the invalid path simply doesn't exist in the interface. The response is instant with `useOptimistic`.

### 🧱 How do you grow from 2 to N experiments at the lowest cost?

**Solution:** a **feature-based** architecture and a typed registry. Adding a slug to `EXPERIMENTS_MAP` **breaks the build** until the student and teacher renderers exist (`as const` + `satisfies Record<ExperimentsMap, ComponentType>`). The educational content lives in Markdown files, editable without touching components.

### 🚦 How do you gain the confidence to publish a system that's in use?

**Solution:** an E2E suite with **Playwright** (20+ scenarios, Page Object Model, and fixtures) running against the **real backend and a disposable MongoDB** in Docker, with isolated ports and database. The deploy to Vercel only happens if the tests pass, on the **same commit** that was tested. Vercel's automatic deploy is turned off, so the pipeline is the only path to production.

## Project structure

```text
src/
├── app/                          # Routes, layouts, and route handlers (App Router)
├── components/                   # Shared components and UI primitives (shadcn)
├── constants/                    # Typed experiment registry
├── features/                     # Organized by feature
│   ├── experiment/               # Student experience (room, questions, results)
│   │   ├── shared/               #   Socket store, hooks, waiting, error, content
│   │   ├── body-water-loss/      #   Complete, isolated experiment
│   │   └── glycemic-control/     #   Complete, isolated experiment
│   ├── experiment-access/        # PIN entry (action, schema, cookie)
│   ├── experiment-charts/        # Reusable charts (Recharts)
│   ├── teacher-access/           # Teacher login and sign-up
│   ├── teacher-analytics/        # Experiments table (TanStack Table)
│   ├── teacher-experiment/       # Control room and real-time dashboards
│   └── teacher-experiment-manage/# Create, edit, and delete
├── lib/
│   ├── api/                      # Server-only HTTP client, errors, and config
│   ├── socket/                   # Generic SocketService + SocketManager
│   └── signed-cookies.ts         # HMAC-SHA256 with Web Crypto
├── proxy/                        # Route guards
└── proxy.ts                      # Next.js proxy entry point
```


## Technical highlights

| Decision | Why it matters |
| --- | --- |
| Signed cookies (HMAC-SHA256) with Web Crypto | Authentication without a JWT library, `httpOnly`, running in the Next.js proxy runtime |
| API token never reaches the browser | `server-only` HTTP client, with a header allowlist and mandatory HTTPS in production |
| Typed Socket.IO + `useSyncExternalStore` | Real time with reconnection and error handling, with no duplicated state |
| State machine for the class lifecycle | Invalid actions simply don't exist in the interface |
| `as const` + `satisfies` in the experiment registry | An incomplete experiment becomes a compile error |
| E2E against the real backend in CI | Only what passed the tests goes to production |
| Modern Next.js 16 | Server Actions, `useActionState`, `useOptimistic`, React Compiler, and Cache Components |
| Mobile first | shadcn/ui + Radix, skeletons, and error and empty states |

## Stack

**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui + Radix UI · React Hook Form + Zod 4 · TanStack Query + Table · Recharts · react-markdown

**Real time:** Socket.IO Client

**Quality:** Playwright (Page Object Model + fixtures) · ESLint · Prettier

**Infra:** GitHub Actions · Docker Compose (E2E environment) · Vercel (Analytics + Speed Insights)

**Backend** (separate repository): REST API + Socket.IO + MongoDB

## Running locally

**Requirements:** Node.js 20.9+ and the [Quimera backend](https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-2024) running.

```bash
git clone https://github.com/Mariana-Evangelista/Projeto-Quimera-PIC-Frontend.git
cd Projeto-Quimera-PIC-Frontend
npm install
```

Create the `.env.local` file:

```env
API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# Cookie signing secrets (minimum 32 characters each).
# Generate with: openssl rand -base64 48
TEACHER_ACCESS_TOKEN_SECRET=
EXPERIMENT_ACCESS_SECRET=
```

```bash
npm run dev   # http://localhost:3000
```

<details>
<summary><strong>Available scripts</strong></summary>

| Command | Description |
| --- | --- |
| `npm run dev` / `build` / `start` | Development, build, and production run |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm run test:e2e` | Full E2E suite (Playwright) |
| `npm run test:e2e:smoke` | `@smoke` tests only |
| `npm run test:e2e:ui` / `debug` / `report` | Interactive, debug, and report modes |
| `npm run e2e:backend:up` / `down` / `reset` / `logs` | Isolated E2E environment (API + MongoDB in Docker) |

</details>

To run the E2E tests locally, see [`e2e/README.md`](./e2e/README.md).

## Credits

Original Scientific Initiation project (PIC 2024) at Centro Universitário Barão de Mauá. The current version of the frontend, with the Glycemic Control experiment, the new interface, the technology changes, the tests, and the deploy, was built by **Mariana Evangelista**.
