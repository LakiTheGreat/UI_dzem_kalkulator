# Known issues / refactoring candidates

State at AI-setup time; none are fixed yet. Do not fix them opportunistically inside unrelated changes.

## Backend coupling
- `src/api/constantApi.ts` reads constants by **hard-coded database ids** chosen by user (`userId === 1 ? 3 : 1`, etc.); the BE has no list endpoint for constants. Breaks if rows change.
- `userId === 1` is special-cased in several places (nav label, `filterFruits` skipped for the test user in Orders/Transactions/Settings pages). The real-user filter `EXCLUDED_LABELS` in `utils/filterFruits.ts` is a hard-coded list of fruit names.
- Some `url` strings contain stray whitespace (`${constantApiUrl}/${...} `).
- Error handling: `useApiErrorNotification` reads `error.message`, which is not the BE error shape (`{ message, status, customStatusCode }` inside RTK Query's `error.data`).

## Structure
- README says `npm run dev`, but the script is `npm start`; `src/version.ts` header mentions `update-version.js` but the script is `write-build-version.js`.
- Typo folder `pages/Tommatoes`; filenames `ResetButtton.tsx`, `tomatos.ts`, `bouguets.ts`; file `api/fruitsSlice.ts` is an API file, not a slice; inconsistent API file naming (`cups.ts`, `cupCosts.ts` vs `ordersApi.ts`).
- Tomato module duplicates the order/transaction page pattern.
- Large hook `useGetDataGridTranslations.ts` (~11 KB) of static strings.
- Business rules and Serbian strings are inline in components; `constants/index.ts` hard-codes cup types/prices and `YEARS` (2025, 2026).
- Several source files appear mojibake in the terminal (`DÅ¾emulator`); confirm the real file encoding before editing strings.
- `typescript` 4.9 with CRA 5 (old toolchain); `@types/node` 16.

## Tooling
- No tests (`react-scripts test` is available but no test files), no formatter config, no CI.
- `.env` holds `REACT_APP_API_URL` with a commented-out alternative; keep it local.
- `package.json` name is the CRA default `my-app`.
