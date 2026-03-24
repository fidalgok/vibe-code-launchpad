# Progress: Vibe Code Launchpad

## Current Status
Template created and ready for use. This file tracks changes made during development sessions.

## Codebase Patterns

### Server-Side AI Calls
All Gemini API calls go through `app/lib/gemini.server.ts`. The `.server.ts` suffix ensures tree-shaking removes this from the client bundle. Frontend accesses via `fetch("/api/gemini", { method: "POST", ... })`.

### Route Architecture
- `app/routes.ts` is the route table — register all new routes here
- `app/routes/api.*.tsx` — server-only API endpoints (no UI)
- `app/routes/*.tsx` — pages with UI

### Styling
Tailwind CSS v4 with `@import "tailwindcss"` in `app/app.css`. No config file needed — v4 uses CSS-first configuration.

## Session Log

### 2026-03-24
**What happened:**
- Initial template creation
- React Router 7 SSR + Netlify + Gemini API stack
- Server-side API route for safe Gemini calls
- Four project skills: import-project, deploy, add-api-route, add-auth
- Student-facing README and GETTING-STARTED.md
- CLAUDE.md with comprehensive non-technical user guidance

**Key decisions:**
- SSR mode required (not SPA) to enable server-side API routes
- Gemini 2.5 Flash as default model (good balance of speed/quality)
- Cookie sessions for auth (when needed) — no external auth provider required
