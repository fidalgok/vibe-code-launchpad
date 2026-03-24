---
name: import-project
description: Import and migrate code from a vibe-coding platform (AI Studio, Bolt, Replit, Lovable) into this template safely. Handles API key migration, component extraction, and dependency reconciliation.
version: "1.0.0"
trigger: user-invoked
metadata:
  sharing: team
---

# Import Project from Vibe-Coding Platform

You are helping a non-technical user import their project from a vibe-coding platform into this React Router template. Be patient, thorough, and explain every step.

## Step 1: Identify the Source

Ask the user:
- "Which platform did you build this in?" (AI Studio, Bolt, Replit, Lovable, ChatGPT artifact, other)
- "Do you have the exported files? If so, where are they?"
- "Can you describe what your app does in a sentence or two?"

## Step 2: Analyze the Export

Read the exported files and identify:

1. **UI Components** — What does the interface look like? What are the main sections?
2. **AI/API Calls** — Search for: `GoogleGenAI`, `generateContent`, `fetch`, `axios`, API key references, `process.env`
3. **Dependencies** — What packages does the export use that aren't in our template?
4. **Data/State** — How does the app manage data? Local state? Database?
5. **Security Issues** — Any API keys exposed in client-side code?

Report your findings to the user in plain language:
> "I've looked through your export. Here's what I found:
> - Your app has [X main sections]
> - It makes [N] calls to the Gemini API — I'll need to move these to the server for security
> - It uses [these extra packages] that I'll need to install
> - [Any issues found]"

## Step 3: Plan the Migration

Create a clear plan and share it:

1. **Components to create** — List each UI piece that needs its own file
2. **Server functions to create** — Each AI/API call that needs to move server-side
3. **Routes to set up** — If the app has multiple pages
4. **Dependencies to install** — Extra packages needed
5. **Environment variables** — Any new secrets needed

Ask: "Does this plan look right? Anything I'm missing about how your app works?"

## Step 4: Execute the Migration

Work through the plan systematically:

### 4a: Install Dependencies
```bash
npm install [packages from the export that aren't in our template]
```

### 4b: Move AI Logic to Server
- Create new functions in `app/lib/gemini.server.ts` or new `.server.ts` files
- Each distinct AI operation gets its own function
- Preserve the prompts and system instructions from the original

### 4c: Create/Update API Routes
- For each AI function, create a corresponding API route or add to an existing route action
- Wire up the request/response pattern

### 4d: Build the UI
- Extract components from the export into `app/components/`
- Replace the home page or add new routes as needed
- Convert any API calls to use `fetch("/api/...")` instead of direct SDK calls
- Keep styling — convert to Tailwind if needed, or keep existing CSS

### 4e: Remove Security Issues
- Delete any `process.env.GEMINI_API_KEY` references from non-server files
- Check vite.config.ts for `define` blocks that expose keys
- Verify `.env` is in `.gitignore`

## Step 5: Test and Verify

1. Run `npm run dev`
2. Test each feature of the app
3. Run `npm run typecheck`
4. Verify the Gemini API calls work through the server route

Tell the user: "Your app is imported and working! Here's what changed and why..."

## Platform-Specific Notes

### AI Studio
- Exports a single `src/App.tsx` with everything — needs to be split up
- `vite.config.ts` has a `define` block that injects the API key — REMOVE THIS
- Uses `@google/genai` which is already in our template
- May include `motion` (Framer Motion) for animations
- `metadata.json` has app description — useful context but not needed in code

### Bolt
- Usually exports a full project with proper file structure
- May use Next.js instead of React Router — need to convert routes
- Check for `.env` files that might have real keys committed

### Replit
- Exports the full project directory
- May have a different server setup (Express, Fastify)
- Check `replit.nix` or `.replit` for runtime configuration clues

### Lovable
- Generates clean React + TypeScript code
- Usually Vite-based, so closer to our template
- Check for Supabase integration if the app has a database

### ChatGPT/Claude Artifacts
- Single HTML file with embedded CSS and JavaScript
- Need to convert vanilla JS to React patterns
- Inline styles need conversion to Tailwind
- Usually no server-side code — all client-side
