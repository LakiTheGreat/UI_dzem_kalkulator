# v1 / v2 migration (UI side)

The backend is refactored gradually into a parallel `/api/v2` (see `BE_dzem_kalkulator/docs/v2-migration.md`). The UI chooses v1 or v2 **per resource** with a flag, so a bad v2 can be rolled back by flipping the flag.

## Decisions (agreed)

| Topic | Decision |
|---|---|
| Version selection | URL: v1 = `/api/<resource>`, v2 = `/api/v2/<resource>`. A per-resource flag in the UI decides which one an endpoint calls. |
| Default | v1 for every resource. Switching a resource to v2 is a deliberate, reviewed change. |
| Contract | v2 keeps the same request/response contract as v1, so UI code and types do not change when the flag flips. |
| Pilot resource | `fruits` (BE side: `GET /api/v2/fruits` exists; other fruits endpoints are being added one by one). |
| Rollback | Flip the flag back to v1. No BE redeploy needed. |

## Intended design (implemented for fruits)

- `src/constants/apiVersions.ts` holds `API_VERSIONS` (resource -> endpoint -> `'v1' | 'v2'`, flag lives in code, per endpoint) and `withApiVersion(version, path)` which prefixes `/v2`.
- Resource API files wrap their URLs with it (see `src/api/fruitsSlice.ts`). Currently only `fruits.list` is `'v2'`.
- There is no automatic fallback: a flag pointing to a v2 route the BE does not have yields a 404.

## Rules

- Never switch a flag to v2 for an endpoint the BE has not shipped and tested.
- Do not change response types when flipping a flag; if v2 differs, it is a BE bug to fix first.
- Test the flipped flag manually as the test user (`userId = 1`), never as the real user.

## Decided

- Flag is per endpoint and lives as a constant in code (rollback = change one line and redeploy).
