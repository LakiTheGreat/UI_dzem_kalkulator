# Architecture

## Data flow

```
Page component -> RTK Query hook (useGetXQuery / useXMutation) -> api (fetchBaseQuery)
              -> BE `${REACT_APP_API_URL}/<resource>` with header x-user-id
```

- `src/api/index.ts` defines one `createApi` (`reducerPath: 'realApi'`) with `fetchBaseQuery`. The base URL is `REACT_APP_API_URL`. `prepareHeaders` adds `x-user-id` from `state.auth.userId`. Retries are disabled (`maxRetries: 0`).
- Each resource file (`fruitsSlice.ts`, `ordersApi.ts`, `transactionsApi.ts`, `tomatoesApi.ts`, ...) calls `api.injectEndpoints` and exports hooks. Cache invalidation is by tag; the tag list lives in `api/index.ts` (`Fruit, Cups, Constant, Order, Inventory, Transactions, Bouquet, Tomato*`). Add a tag there when adding a resource.
- Mutations usually invalidate related tags (e.g. renaming/deleting a fruit invalidates `Fruit` and `Order`).

## State

Redux store (`src/store/store.ts`): `realApi` reducer + `auth` slice. Only `auth` is persisted (redux-persist, localStorage). `auth.userId` is set by `logInUser` after `POST /auth/login` and cleared by `logOutUser`.

## Routing and guards

`src/router.tsx` (react-router 7 `createBrowserRouter`). Route paths come from `src/constants/routes.ts` (`routesJam`, `routesTomatoes`, `routesBouquets`, `routesSettings`, `routesAuth`). `AuthGuard` redirects to login when there is no `userId`; `GuestGuard` redirects logged-in users to the orders page. `App.tsx` is the layout (desktop/mobile nav + footer).

## Modules (pages)

| Area | Folder | Notes |
|---|---|---|
| Jams | `pages/Jams/{OrdersPage,InventoryPage,TransactionsPage}` | production batches, stock per cup, stock movements |
| Tomatoes | `pages/Tommatoes/*` (typo in folder name) | separate, simpler copy of the same ideas |
| Bouquets | `pages/Bouquets/BouquetPage` | sales records |
| Other | `pages/Other/{LoginPage,SettingsPage,CalculatorPage}` | settings manage fruits, cup costs/values, constants |

Pattern per page: `index.tsx` (list/table, DataGrid), `form/` (Create*/Edit*/shared *Form using react-hook-form with `RHF*` components from `src/components`), `table/` (columns).

## Shared building blocks

- Forms: `FormProvider`, `RHFTextInput`, `RHFSelectInput`, `RHFCheckbox`, `ResetButtton`.
- Feedback: `useApiSuccessNotification`, `useApiErrorNotification` (react-toastify), `utils/toastify/*`, `useConfirmDialog`.
- Lists: MUI X DataGrid with `CustomToolbar`, `DataGridRowActions`, translations in `useGetDataGridTranslations`.
- Formatting: `FormattedPrice`, `formatDate`, `formatLocalDateTime`, `calculateProfitMargin`, `mapToMenuItems`.

## Build and deploy

CRA build (`npm run build`); `prebuild` runs `scripts/write-build-version.js`, which writes `src/version.ts` (`APP_VERSION` = git commit count, shown in the footer). Vercel deploys on push to `main`. The UI targets the backend on Render.

## Conventions observed

- API files: `<resource>Api.ts` (some are `<resource>.ts` or `*Slice.ts`), URL constant at top, hooks exported at bottom.
- Types in `src/types/<resource>.ts`, matching BE JSON (`id`, `label`, `isDeleted`, ...).
- Relative imports (no path aliases), 2-space indent, single quotes, JSX single quotes.
- Serbian user-facing strings inline in components.
