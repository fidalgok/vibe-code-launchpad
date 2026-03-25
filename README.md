# Vibe Code Launchpad

A starter template for turning AI prototypes into real, deployable web apps. Built for non-technical users working with AI coding assistants.

**New here? Read [GETTING-STARTED.md](GETTING-STARTED.md)** — it walks you through everything step by step.

**Live demo:** [vibe-code-launchpad.netlify.app](https://vibe-code-launchpad.netlify.app)

---

## Quick Reference

### Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (run first) |
| `npm run dev` | Start the dev server at localhost:5173 |
| `npm run build` | Build for production |
| `npm run typecheck` | Check for code errors |

### Project Structure

| File / Folder | What it is |
|---|---|
| `app/routes/home.tsx` | Your main page — replace with your app |
| `app/routes/api.gemini.tsx` | Server route that talks to Gemini safely |
| `app/lib/gemini.server.ts` | Gemini API helpers |
| `app/components/` | Reusable UI pieces |
| `.env` | Your API keys (never shared) |
| `AGENTS.md` | Instructions for your AI coding assistant |

### AI Context Files

This template includes instructions for multiple AI coding tools:

| File | Tool |
|---|---|
| `AGENTS.md` | Canonical source (Codex, Windsurf, others) |
| `CLAUDE.md` | Claude Code |
| `.cursorrules` | Cursor |

All three contain the same guidance — security rules, stack documentation, import procedures, and deployment instructions.

---

## Stack

React Router 7 (SSR) + Tailwind CSS v4 + Google Gemini API + Netlify

SSR mode keeps API keys on the server. Netlify deploys automatically from GitHub. Everything has a free tier.

---

*Built by Kyle Fidalgo for BC Law's vibe-coding curriculum.*
