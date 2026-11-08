# Copilot instructions

Read [AGENTS.md](../AGENTS.md) first; it is the single source of truth for commands, layout and hard rules.
Then see `docs/architecture.md`, and use the `repo-conventions` skill (`.github/skills/repo-conventions/SKILL.md`) when adding or changing API endpoints, pages or forms.

Key reminders: RTK Query endpoints in `src/api/<resource>.ts` injected into the shared `api`, auth via `x-user-id` header from `authSlice`, MUI + react-hook-form patterns, Serbian UI text, never commit/push to `main`, never commit or push without owner approval, no secrets or `.env` in the repo.
