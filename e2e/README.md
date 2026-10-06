# E2E Test Backend Environment

This folder contains the configuration to spin up an isolated backend + MongoDB for E2E testing.

## Quick Start

```bash
# 1. Copy example env and fill in secrets
cp e2e/.env.e2e.example e2e/.env.e2e
# Edit e2e/.env.e2e with real values (see below)

# 2. Start the test backend (MongoDB + API)
npm run e2e:backend:up

# 3. Wait for API to be healthy
npm run e2e:wait-for-api

# 4. Run smoke tests against the test backend
API_BASE_URL=http://127.0.0.1:8001 npm run test:e2e:smoke

# 5. Stop and clean up
npm run e2e:backend:down
```

## Required Secrets (fill in `e2e/.env.e2e`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_ROOT_USERNAME` | MongoDB root user | `e2e_user` |
| `MONGO_ROOT_PASSWORD` | MongoDB root password | `strong_random_password` |
| `JWT_SECRET` | Backend JWT secret (≥32 chars) | `generated_secret_here` |
| `CORS_ORIGIN` | Frontend origin for CORS | `http://127.0.0.1:3000` |

## Generated Secrets (for frontend cookies)

| Variable | Description |
|----------|-------------|
| `TEACHER_ACCESS_TOKEN_SECRET` | ≥32 chars, different from production |
| `EXPERIMENT_ACCESS_SECRET` | ≥32 chars, different from production |

## Isolation Guarantees

- **MongoDB**: Runs on port **27018** (dev uses 27017), database `quimera_e2e`, volume `mongo-e2e-data`
- **Backend API**: Runs on port **8001** (dev uses 8000)
- **No shared volumes** with development environment
- **No access** to production data

## Commands

| Command | Description |
|---------|-------------|
| `npm run e2e:backend:up` | Start MongoDB + backend containers |
| `npm run e2e:backend:down` | Stop containers and **remove volumes** (clean slate) |
| `npm run e2e:backend:reset` | Down + up (full reset) |
| `npm run e2e:backend:logs` | Follow container logs |
| `npm run e2e:wait-for-api` | Poll `/health` until ready (default 60s timeout) |

## CI Usage

In CI, the same `docker-compose.e2e.yml` is used. The workflow:
1. Checks out backend repo at fixed ref
2. Runs `npm run e2e:backend:up`
3. Runs `npm run e2e:wait-for-api`
4. Builds frontend and runs Playwright
5. Runs `npm run e2e:backend:down` (cleanup)