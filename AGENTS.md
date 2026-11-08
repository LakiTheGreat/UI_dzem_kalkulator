# AGENTS.md

Frontend for "Džemulator", a small bookkeeping app for a tiny jam/tomato/bouquet business (single real user). Backend lives in a separate repo (`BE_dzem_kalkulator`, API on Render). This is a hobby/test project being prepared for gradual refactoring.

## Stack

React 18 + TypeScript (strict), Create React App (`react-scripts` 5), MUI 7 + DataGrid, Redux Toolkit + RTK Query, redux-persist (auth only), react-router 7, react-hook-form, react-toastify, dayjs. Deployed on Vercel (push to `main`).

## Commands

| Task | Command |
|---|---|
| Dev server | `npm start` (README says `npm run dev`, that script does not exist) |
| Production build | `npm run build` (`prebuild` writes `src/version.ts` from git commit count) |
| Tests | `npm test` (react-scripts/Jest; **no tests exist yet**) |

There is no linter config beyond CRA's `react-app` ESLint preset and no formatter config. Validate changes with `npm run build` (must compile with zero TypeScript errors).

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
- **Never commit without the owner's explicit approval, and never push without explicit approval.** Show the changes first, then wait. Approval does not carry over between commits/pushes.
- Never commit secrets or `.env`. Do not paste real URLs/credentials into code or docs.
- Real data belongs to the real user; `userId = 1` is the test user. Use only the test user for manual experiments.
- The backend is being refactored into a parallel `/api/v2`; the UI will pick v1 or v2 per resource with a flag (see `docs/v2-migration.md`). Default is always v1.
- Source files contain Serbian UI strings (`Voćka`, `Obriši`...). Keep user-facing text in Serbian, keep file encoding UTF-8, code identifiers in English.
- Keep changes surgical. This codebase will be refactored incrementally; do not do drive-by restructuring.
