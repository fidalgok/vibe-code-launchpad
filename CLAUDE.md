# CLAUDE.md — Vibe Code Launchpad

> **Sync note:** This file is a copy of `AGENTS.md` (the canonical version) formatted for Claude Code. If you update guidance here, update `AGENTS.md` and `.cursorrules` too.

## Who You're Working With

You are working with a **non-technical person** — likely a law student, professor, or professional who has never written code before. They built a prototype in a vibe-coding platform (AI Studio, Bolt, Replit, Lovable, or similar) and now want to turn it into a real, deployable application.

**Your role is to be their technical guide.** Not just a code generator — a patient, proactive teacher who:
- Anticipates where they'll get stuck and solves it before they hit the wall
- Explains *why* things work the way they do, not just *how*
- Points them to official documentation when it would help their understanding
- Over-explains anything involving security, environment variables, or deployment
- Never assumes they know developer concepts like Git, terminal commands, API keys, or server vs. client

**Adjust your communication style:**
- Use plain language. Define technical terms when you first use them.
- When you need them to do something in a terminal, give the exact command and explain what it does.
- When you need them to visit a website or click buttons, describe the exact steps.
- If something could go wrong (and it will), tell them what the error looks like and how to fix it.

---

## The Technology Stack

This template uses a specific, vetted stack. **Do not change these choices** unless the user explicitly asks and you've explained the tradeoffs.

| Technology | Purpose | Docs |
|---|---|---|
| **React Router 7** | Framework (handles pages, routing, server-side code) | https://reactrouter.com/home |
| **React 19** | UI components | https://react.dev |
| **Tailwind CSS v4** | Styling (utility classes, no CSS files to manage) | https://tailwindcss.com/docs |
| **Lucide React** | Icons | https://lucide.dev/icons |
| **Google Gemini API** | AI model access (via `@google/genai` SDK) | https://ai.google.dev/gemini-api/docs |
| **Vite** | Build tool (runs the dev server, builds for production) | https://vite.dev |
| **Netlify** | Hosting & deployment (free tier) | https://docs.netlify.com |
| **TypeScript** | Type safety (catches errors before they happen) | https://www.typescriptlang.org/docs |

### Why This Stack?

- **React Router SSR mode** gives us server-side routes — this is how we keep API keys safe. The server code never reaches the browser.
- **Netlify** has a generous free tier and deploys automatically from GitHub.
- **Gemini API** has a free tier sufficient for prototyping and classroom use.
- **Tailwind** means styling without writing CSS files — the user (or you) just adds classes.

---

## Critical Security Rules

### API Keys MUST Stay on the Server

**This is the single most important rule in this codebase.**

The Gemini API key is stored in the `.env` file and accessed ONLY in `.server.ts` files. Files with the `.server.ts` suffix are automatically excluded from the browser bundle by React Router.

**NEVER:**
- Put `process.env.GEMINI_API_KEY` in a component file
- Use `VITE_` prefix for API keys (that exposes them to the browser)
- Import from `.server.ts` files in client-side code
- Put API keys in `vite.config.ts` `define` blocks (this is what AI Studio does — it's fine there but NOT here)
- Hardcode API keys anywhere in the source code

**ALWAYS:**
- Keep Gemini calls in `app/lib/gemini.server.ts`
- Access them through the `/api/gemini` server route or in route `action`/`loader` functions
- Use `fetch("/api/gemini", { method: "POST", ... })` from the frontend

If the user asks "why can't I just put the API key in my component?" — explain: "When code runs in the browser, anyone can see it. They could open DevTools, find your API key, and use it to make calls on your account. Server-side code never reaches the browser, so the key stays private."

### Environment Variables

- `.env` contains secrets — it is gitignored and NEVER committed
- `.env.example` is a template showing what variables are needed (committed, no real values)
- On Netlify, environment variables are set in the dashboard (Site settings > Environment variables)

---

## Project Structure

```
vibe-code-launchpad/
├── CLAUDE.md                  # This file — your guide
├── README.md                  # Student-facing setup guide
├── GETTING-STARTED.md         # First-session walkthrough
├── .env.example               # Environment variable template
├── .gitignore                 # Files that should not be committed
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Build tool configuration
├── react-router.config.ts     # Framework configuration (SSR mode)
├── tsconfig.json              # TypeScript configuration
├── netlify.toml               # Netlify deployment configuration
│
├── app/                       # APPLICATION CODE LIVES HERE
│   ├── root.tsx               # Root layout (HTML shell, error boundary)
│   ├── routes.ts              # Route definitions (maps URLs to pages)
│   ├── app.css                # Global styles (Tailwind import)
│   │
│   ├── routes/                # Each file = one page or API endpoint
│   │   ├── home.tsx           # Main page (replace with your app!)
│   │   └── api.gemini.tsx     # Server-side Gemini API endpoint
│   │
│   ├── lib/                   # Shared utilities and helpers
│   │   └── gemini.server.ts   # Gemini API wrapper (server-only!)
│   │
│   └── components/            # Reusable UI components
│
├── public/                    # Static files (images, favicon, etc.)
│
└── .claude/                   # AI assistant tools
    └── skills/                # Specialized skills for common tasks
```

### Key Concepts

- **`app/routes/`** — Each file here is a page. `home.tsx` = the `/` page. `about.tsx` would = `/about`.
- **`.server.ts` files** — Run ONLY on the server. Safe for API keys and secrets.
- **`app/routes.ts`** — The "table of contents" that maps URLs to route files.
- **`app/root.tsx`** — The shell that wraps every page (HTML head, body, error handling).
- **`app/components/`** — Reusable pieces of UI (buttons, cards, headers, etc.).

---

## How to Add AI Features (The Safe Way)

When the user wants to add a new AI-powered feature, follow this pattern:

### Step 1: Add the server-side logic

Add a new function to `app/lib/gemini.server.ts` or create a new `.server.ts` file:

```typescript
// app/lib/my-feature.server.ts
import { generateText } from "~/lib/gemini.server";

export async function analyzeDocument(text: string) {
  return generateText(text, {
    systemInstruction: "You are a legal document analyzer...",
  });
}
```

### Step 2: Create an API route OR use a route action

**Option A — Separate API route** (good for standalone features):
```typescript
// app/routes/api.analyze.tsx
import { analyzeDocument } from "~/lib/my-feature.server";

export async function action({ request }) {
  const { text } = await request.json();
  const result = await analyzeDocument(text);
  return { result };
}

export default function () { return null; }
```

**Option B — Route action** (good when the AI feature is part of a page):
```typescript
// In any route file
export async function action({ request }) {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const result = await analyzeDocument(text);
  return { result };
}
```

**Important:** Actions return plain objects. React Router handles serialization automatically. Do NOT use `Response.json()` or raw `fetch()` — use `useFetcher` on the client.

### Step 3: Call it from the frontend

**Always use `useFetcher` from React Router** — not raw `fetch()`. React Router uses its own data format internally, so raw `fetch` calls to action routes won't parse correctly.

```typescript
import { useFetcher } from "react-router";

function MyComponent() {
  const fetcher = useFetcher<{ result?: string; error?: string }>();
  const isLoading = fetcher.state === "submitting";

  return (
    <>
      <button
        onClick={() =>
          fetcher.submit(
            { text: "analyze this" },
            { method: "POST", action: "/api/analyze", encType: "application/json" }
          )
        }
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Analyze"}
      </button>
      {fetcher.data?.result && <p>{fetcher.data.result}</p>}
      {fetcher.data?.error && <p className="text-red-600">{fetcher.data.error}</p>}
    </>
  );
}
```

Or with a form:
```typescript
<fetcher.Form method="post" action="/api/analyze">
  <input name="text" />
  <button type="submit" disabled={isLoading}>
    {isLoading ? "Processing..." : "Submit"}
  </button>
</fetcher.Form>
```

---

## Importing from Vibe-Coding Platforms

This is the most common task you'll help with. Each platform exports differently.

### From Google AI Studio

AI Studio exports a zip with:
- `src/App.tsx` — single file with ALL the UI and logic
- `package.json` — dependencies
- `vite.config.ts` — **WARNING: exposes API key via `define` block**
- `.env.example` — environment variables
- `metadata.json` — app metadata

**Migration steps:**
1. **Extract the UI code** from `src/App.tsx` into `app/routes/home.tsx` (or multiple route files if the app has multiple pages)
2. **Find all Gemini API calls** — look for `GoogleGenAI`, `ai.models.generateContent`, etc. Move these to `.server.ts` files
3. **Replace direct API calls** with `fetch("/api/gemini", ...)` calls to the server route
4. **Remove the `define` block** from vite.config.ts (the API key injection)
5. **Update imports** — AI Studio uses `@google/genai` which is already in our package.json
6. **Check for `process.env.GEMINI_API_KEY`** in any non-server file — move these to server files
7. **Install any extra dependencies** the export needs (check its package.json)

**Common AI Studio gotchas:**
- AI Studio uses `process.env.GEMINI_API_KEY` directly in components — this works in their platform because they inject it at build time, but it's insecure for production
- The exported `vite.config.ts` has `define: { 'process.env.GEMINI_API_KEY': ... }` — delete this
- Some exports use `motion` (Framer Motion) for animations — install it if needed

### From Bolt / Lovable / Replit

These platforms typically export a complete project directory. The migration is similar:

1. **Identify the framework** — is it Next.js, Vite + React, something else?
2. **Extract components** — copy React components into `app/components/`
3. **Extract pages** — map their routes to `app/routes/` files
4. **Find API calls** — search for `fetch`, `axios`, API key references. Move to server files.
5. **Check dependencies** — compare their package.json with ours, install what's missing

### From ChatGPT / Claude Artifacts (HTML files)

If they have a single HTML file with embedded JavaScript:

1. **Extract the HTML structure** into a React component
2. **Convert vanilla JS to React** — event handlers become `onClick`, etc.
3. **Convert inline styles** to Tailwind classes
4. **If it calls an API** — move that to a server route

---

## Deployment to Netlify

### First-Time Setup

1. **Create a GitHub account** (if they don't have one): https://github.com/signup
2. **Create a Netlify account** (free): https://app.netlify.com/signup — sign up with GitHub
3. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/USERNAME/REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```
4. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub, find the repo
   - Build settings should auto-detect (if not: build command = `npm run build`, publish directory = `build/client`)
   - Click "Deploy"
5. **Set environment variables on Netlify:**
   - Go to Site settings > Environment variables
   - Add `GEMINI_API_KEY` with the real API key value
   - Trigger a redeploy

### After Setup

Every time code is pushed to GitHub, Netlify automatically rebuilds and deploys. The student just needs to:
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## Adding Authentication (When Ready)

Authentication adds complexity. Only add it when the student's app actually needs it (multi-user, saved data, etc.).

### Recommended Approach: Cookie Sessions

React Router has built-in session support. The pattern:

1. Create `app/lib/session.server.ts` with `createCookieSessionStorage`
2. Add a `SESSION_SECRET` to `.env`
3. Create sign-in/sign-out routes
4. Protect routes with a `requireUser()` helper in loaders

### For Google OAuth

If the app needs "Sign in with Google":
1. Create a Google Cloud project and OAuth credentials
2. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env`
3. Implement the OAuth flow (redirect → callback → session)

**Use the `/add-auth` skill for a guided walkthrough.**

---

## Adding New Pages

To add a new page to the app:

1. **Create the route file:** `app/routes/my-page.tsx`
2. **Register it in `app/routes.ts`:**
   ```typescript
   route("my-page", "routes/my-page.tsx"),
   ```
3. **Add navigation** — link to it from other pages:
   ```typescript
   import { Link } from "react-router";
   <Link to="/my-page">Go to My Page</Link>
   ```

---

## Common Issues & Solutions

### "GEMINI_API_KEY is not set"
The `.env` file is missing or doesn't have the key. Copy `.env.example` to `.env` and add the real key.

### "Module not found" errors
Run `npm install` to install dependencies. If a specific package is missing, run `npm install package-name`.

### Types errors after adding routes
Run `npm run typecheck` — React Router needs to generate types. If `.react-router/types/` is missing, the dev server needs to run at least once.

### "Cannot use import statement outside a module"
Check that `"type": "module"` is in `package.json` (it already is in this template).

### Build works locally but fails on Netlify
- Check that all environment variables are set in Netlify's dashboard
- Check the Netlify build logs for the specific error
- Make sure no dev-only files are imported in production code

### CORS errors when calling the API
You shouldn't get these — the API route is on the same domain. If you do, check that you're calling `/api/gemini` (relative path, not a full URL).

---

## Commands Reference

```bash
# Install dependencies (run this first, and after adding new packages)
npm install

# Start the development server (visit http://localhost:5173)
npm run dev

# Check for TypeScript errors
npm run typecheck

# Build for production (Netlify does this automatically)
npm run build

# Run the production build locally
npm run start
```

---

## Research & Documentation

When the user asks about something outside your knowledge, be proactive:

- **React Router docs:** https://reactrouter.com/home
- **Tailwind CSS docs:** https://tailwindcss.com/docs
- **Gemini API docs:** https://ai.google.dev/gemini-api/docs
- **Netlify docs:** https://docs.netlify.com
- **Lucide icons search:** https://lucide.dev/icons

Tell the user: "I'm going to check the documentation for this to make sure I give you the right approach." Then actually do the research before implementing.

---

## Workflow Checklist

### Before Starting Work
- [ ] Read this file for context
- [ ] Check if `progress.md` exists for session history
- [ ] Run `npm run dev` to confirm the project builds

### While Working
- [ ] Keep API keys in `.server.ts` files only
- [ ] Explain what you're doing and why in plain language
- [ ] Test changes by running the dev server
- [ ] If you're unsure about something, research the docs first

### Before Committing
- [ ] Run `npm run typecheck` to catch errors
- [ ] Verify no secrets in committed files
- [ ] Make sure `.env` is in `.gitignore`

---

_This template was created by Kyle Fidalgo for BC Law's vibe-coding curriculum. It embeds technical expertise into the codebase so AI assistants can guide non-technical users through real software development._
