# Vibe Code Launchpad

A starter template for turning your AI Studio / Bolt / Replit / Lovable prototype into a real, deployable web app.

## What This Is

You built something cool in a vibe-coding platform. This template helps you take that idea and turn it into a real application that:

- Lives at its own URL on the internet
- Keeps your API keys safe (not exposed to anyone who visits)
- Can grow as you add features
- Deploys automatically when you push changes

## What You Need

1. **Node.js** installed on your computer ([download here](https://nodejs.org) — choose the LTS version)
2. **A code editor** — we recommend [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.com/)
3. **A Gemini API key** (free) — get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
4. **An AI coding assistant** — Claude Code, Cursor, Windsurf, or similar

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up your environment variables
cp .env.example .env
# Then edit .env and add your Gemini API key

# 3. Start the development server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

## Importing Your Project

Have an export from AI Studio, Bolt, or another platform? Ask your AI assistant:

> "Help me import my project from [platform name]. The files are at [location]."

The assistant has detailed instructions for handling each platform's export format.

## Deploying to the Internet

When you're ready to share your app, ask your AI assistant:

> "Help me deploy this to Netlify."

The assistant will walk you through setting up GitHub and Netlify (both free).

## Project Structure

| Folder/File | What It Does |
|---|---|
| `app/routes/home.tsx` | Your main page — replace this with your app |
| `app/routes/api.gemini.tsx` | Server-side route that talks to Gemini (keeps API key safe) |
| `app/lib/gemini.server.ts` | Gemini API helper functions |
| `app/components/` | Reusable UI pieces (buttons, cards, etc.) |
| `CLAUDE.md` | Instructions for your AI coding assistant |
| `.env` | Your secret API keys (never shared) |

## Adding AI Features

Every AI feature follows this pattern:

1. **Server function** — The code that talks to Gemini (in a `.server.ts` file)
2. **API route** — An endpoint the browser can call (in `app/routes/`)
3. **UI component** — The button/form/display that the user sees

Ask your AI assistant: "Help me add an API route for [describe your feature]."

## Need Help?

- Ask your AI assistant! The `CLAUDE.md` file gives it detailed context about this project.
- [React Router docs](https://reactrouter.com)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Gemini API docs](https://ai.google.dev/gemini-api/docs)

---

*Built with React Router 7, Tailwind CSS, Google Gemini, and Netlify.*
