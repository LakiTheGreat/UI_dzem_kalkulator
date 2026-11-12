# AGENTS.md

Frontend for "Džemulator", a small bookkeeping app for a tiny jam/tomato/bouquet business (single real user). Backend lives in a separate repo (`BE_dzem_kalkulator`, API on Render). This is a hobby/test project being prepared for gradual refactoring.

## Stack

React 18 + TypeScript (strict), Create React App (`react-scripts` 5), MUI 7 + DataGrid, Redux Toolkit + RTK Query, redux-persist (auth only), react-router 7, react-hook-form, react-toastify, dayjs. Deployed on Vercel (push to `main`).

## Commands

| Task | Command |
|---|---|
| Dev server | `npm start` (README says `npm run dev`, that script does not exist) |
| Production build | `npm run build` (`prebuild` writes `src/version.ts` from git commit count) |
| Tests | `npm test` (react-scripts/Jest; **no unit tests exist yet**) |
| E2E tests | `npm run test:e2e` (Playwright, see below) |

There is no linter config beyond CRA's `react-app` ESLint preset and no formatter config. Validate changes with `npm run build` (must compile with zero TypeScript errors).

## E2E tests (Playwright)

`e2e/*.spec.ts`, config in `playwright.config.ts`. Like the BE tests they use the real database, act **only as test user `userId = 1`** (login is skipped by seeding the persisted auth state) and restore what they change. Currently covered: `constants`, `fruits`, `cupCosts`/`cupValues` (`cupPrices.spec.ts`), `tomatoes` (orders + transactions). `cups` has no screen of its own.

- Start the backend locally first (`npm run build` + `npm start` in `BE_dzem_kalkulator`, port 3333 from its `.env`).
- `npm run test:e2e` starts its own UI dev server on port 3000 (stop any running `npm start` first) with `REACT_APP_API_URL` set to `E2E_API_URL` (default `http://localhost:3333/api`). The config refuses a non-local API URL, so the real backend can never be hit.
- First run on a machine: `npx playwright install chromium`.

## Environment

`.env` (git-ignored) must define `REACT_APP_API_URL` (base URL of the backend `/api`, e.g. local `http://localhost:3333/api` or the Render URL). Never commit `.env`. The backend CORS allow-list only permits `http://localhost:3000` and the Vercel domain.

## Layout

```
src/api/          RTK Query endpoints (one file per resource) on a single `api` (api/index.ts)
src/store/        Redux store, authSlice (userId, persisted)
src/pages/        Jams/ Tommatoes/ Bouquets/ Other/ (Login, Settings, Calculator); each with form/ and table/
src/components/   shared UI: RHF* inputs, DataGrid helpers, nav, guards/
src/hooks/        redux hooks, notifications, confirm dialog, responsive
src/constants/    routes.ts, NavItems.ts, index.ts (options, app name)
src/types/        TS types per resource
src/utils/        formatters, mappers, toastify helpers
src/theme/        MUI theme
src/router.tsx    all routes
```

Details: [docs/architecture.md](docs/architecture.md), [docs/known-issues.md](docs/known-issues.md), [docs/v2-migration.md](docs/v2-migration.md). Step-by-step conventions: skill `repo-conventions` in `.github/skills/repo-conventions/SKILL.md`.

## Hard rules

- **Never commit or push directly to `main`.** Check `git branch --show-current` before every commit; if it is `main`, switch to a feature branch first.
- **Every pull request targets `main`, always** (`gh pr create --base main`). Never target another feature branch, even if the work depends on an unmerged PR.
- **New branches are always created from an up-to-date `main`** (`git fetch origin`, then `git switch -c <name> origin/main`), never from another feature branch.
- **Never commit without the owner's explicit approval, and never push without explicit approval.** Show the changes first, then wait. Approval does not carry over between commits/pushes.
- Never commit secrets or `.env`. Do not paste real URLs/credentials into code or docs.
- Real data belongs to the real user; `userId = 1` is the test user. Use only the test user for manual experiments.
- The backend is being refactored into a parallel `/api/v2`; the UI will pick v1 or v2 per resource with a flag (see `docs/v2-migration.md`). Default is always v1.
- Source files contain Serbian UI strings (`Voćka`, `Obriši`...). Keep user-facing text in Serbian, keep file encoding UTF-8, code identifiers in English.
- Keep changes surgical. This codebase will be refactored incrementally; do not do drive-by restructuring.
