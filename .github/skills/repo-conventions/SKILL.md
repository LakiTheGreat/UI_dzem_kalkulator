---
name: repo-conventions
description: Conventions for changing this React + RTK Query frontend. Use when adding or modifying an API endpoint hook, page, form, table, route or type in this repository.
---

# Repo conventions

Read `AGENTS.md` and `docs/architecture.md` first. Use the closest existing feature as the model (e.g. `pages/Other/SettingsPage/fruits` + `api/fruitsSlice.ts`).

## Adding or changing an API call

1. **Type** in `src/types/<resource>.ts` matching the BE JSON.
2. **Endpoint** in `src/api/<resource>Api.ts`: `api.injectEndpoints({ endpoints: (build) => ({...}) })`, URL constant at top, queries `providesTags`, mutations `invalidatesTags` (include related tags, e.g. `'Order'` when fruits change). New tag -> add to `tagTypes` in `src/api/index.ts`. Export hooks at the bottom.
3. Never hard-code the base URL or the user header: `api/index.ts` does that (`REACT_APP_API_URL`, `x-user-id`).
4. If a v2 flag exists for the resource (see `docs/v2-migration.md`), build the URL through it; default stays v1.

## Adding a page or form

1. Route path in `src/constants/routes.ts`, route in `src/router.tsx` (inside `AuthGuard`), nav entry in `src/constants/NavItems.ts` if needed.
2. Page: `pages/<Area>/<Page>/index.tsx` (list + DataGrid), `form/` (Create/Edit/shared Form), `table/` (columns).
3. Forms: react-hook-form with `FormProvider` and the `RHF*` components from `src/components`.
4. Feedback: `useApiSuccessNotification`, `useApiErrorNotification`, `setToastIsLoading`, `useConfirmDialog` for destructive actions (follow `FruitsSettings.tsx`).

## Rules

- **Never commit or push directly to `main`**; check `git branch --show-current` before every commit.
- **Never commit without the owner's explicit approval, and never push without explicit approval.** Show the changes first and wait. Approval does not carry over to the next commit/push.
- Run `npm run build` before proposing a commit; it must compile with zero TypeScript errors.
- Keep user-facing text in Serbian, identifiers in English, files UTF-8.
- Relative imports, single quotes, 2-space indent (match the surrounding file).
- No secrets, no `.env` contents in code or docs. Manual testing only as test user `userId = 1`.
- Keep diffs focused; record unrelated problems in `docs/known-issues.md` instead of fixing them in passing.
