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

## Intended design (not implemented yet)

- A single config module (e.g. `src/constants/apiVersions.ts`) maps resource -> `'v1' | 'v2'`.
- A small helper builds the URL prefix (`/fruits` or `/v2/fruits`); resource API files use it instead of a literal URL (`const fruitsUrl = '/fruits'` in `src/api/fruitsSlice.ts`).
- Only endpoints that exist in v2 may be flagged to v2 (the flag may need to be per endpoint while the BE migration is partial).

## Rules

- Never switch a flag to v2 for an endpoint the BE has not shipped and tested.
- Do not change response types when flipping a flag; if v2 differs, it is a BE bug to fix first.
- Test the flipped flag manually as the test user (`userId = 1`), never as the real user.

## Open items

- Where the flag lives (build-time env var, constant in code, or runtime/persisted setting). Not decided.
- Whether the flag is per resource or per endpoint.
