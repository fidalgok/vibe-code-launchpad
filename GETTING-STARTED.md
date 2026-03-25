# Getting Started

This guide walks you through your very first session with this template. By the end, you'll have a working app running on your computer and an AI coding assistant ready to help you build.

---

## Before You Begin

You need three things installed and one account set up. This takes about 15 minutes.

### 1. Install Node.js

Node.js is what runs your app on your computer.

- Go to [nodejs.org](https://nodejs.org) and click the big green **LTS** button
- Run the installer with all the default settings
- To check it worked, open a terminal and type: `node --version`
  - **Mac:** Open the app called "Terminal" (search for it in Spotlight)
  - **Windows:** Open "Command Prompt" or "PowerShell" from the Start menu
- You should see a version number like `v22.16.0`. If so, you're good.

### 2. Install an AI Coding Tool

You need an AI assistant that can read and edit the files in your project. Here are your options:

| Tool | Best for | What you need |
|---|---|---|
| **[Cursor](https://cursor.com)** | Easiest to start with. Visual editor with AI chat built in. | Free tier available. Supports Claude, GPT-4, and other models if you have a subscription. |
| **[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)** | Most powerful. Works in the terminal or as a desktop app. | Claude Pro/Max subscription ($20+/mo). |
| **[OpenAI Codex](https://openai.com/index/introducing-codex/)** | Good if you already use ChatGPT. Terminal-based. | ChatGPT Pro subscription. |

**Not sure? Start with Cursor.** It's the most visual and works with any AI subscription you already have.

### 3. Get a Gemini API Key

This is a free password that lets your app talk to Google's AI.

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and save it somewhere safe (you'll need it in a minute)

---

## Step 1: Get the Template

### If your instructor shared a GitHub link:

1. Go to the GitHub repo link your instructor gave you
2. Click the green **"Use this template"** button at the top
3. Click **"Create a new repository"**
4. Give it a name (like `my-legal-app` — lowercase, no spaces, use hyphens)
5. Click **"Create repository"**
6. On your new repo page, click the green **"Code"** button, then **"Open with GitHub Desktop"** or copy the URL and run `git clone [URL]` in your terminal

### If you downloaded a ZIP:

1. Unzip the file
2. Move the folder somewhere you'll remember (like your Documents folder)

---

## Step 2: Open the Project

Open your AI coding tool and open this folder:

- **Cursor:** File > Open Folder > select the project folder
- **Claude Code (terminal):** `cd path/to/your/project` then type `claude`
- **Claude Code (desktop):** Open the app, click "Open Project", select the folder

---

## Step 3: Set Up Your Settings

Open a terminal inside your tool:
- **Cursor:** Terminal > New Terminal (or press Ctrl+\` on the keyboard)
- **Claude Code:** You're already in the terminal

Run this command to install the code libraries your app needs:

```
npm install
```

This downloads everything. It might take a minute — that's normal.

Next, you need to create a settings file for your API key. You have a few options:

**Option A — Use a command:**
```
cp .env.example .env
```
(On Windows, use `copy .env.example .env` instead)

**Option B — Do it manually:**
1. Find the file called `.env.example` in your project
2. Make a copy of it (right-click > Duplicate, or Copy + Paste)
3. Rename the copy to just `.env` (remove the `.example` part)

Now open the `.env` file and replace `paste-your-key-here` with your actual Gemini API key from earlier.

**Why this matters:** The `.env` file holds your secrets. It never gets uploaded or shared — that's built into the template by design.

---

## Step 4: Start Your App

Run this command:

```
npm run dev
```

Open your web browser and go to **http://localhost:5173**

You should see a page that says **"Your app is ready to build"** with a box where you can type a question for Gemini. Try it! Type something and click "Send to Gemini." If you get a response, everything is working.

---

## Step 5: Start Building with Your AI Assistant

Now the fun part. Open the AI chat in your tool:

- **Cursor:** Click the chat icon in the sidebar (or press Cmd+L / Ctrl+L)
- **Claude Code:** Just type in the terminal — it's already your chat

Your AI assistant already knows about this project. It's been given detailed instructions (in the `AGENTS.md` file) about the technology, the security rules, and how to help non-technical users. You don't need to explain any of that.

### Importing your prototype

If you built something in AI Studio, Bolt, or another platform, tell your assistant:

> "I have an export from AI Studio. The files are in [folder path]. Help me import it into this template."

The assistant will analyze your code, move things to the right places, and make sure your API keys are safe.

### Building new features

Just describe what you want in plain language:

> "Add a page that lets users upload a document and get a summary from AI."

> "Make the header dark blue with white text and add a logo."

> "Add a chat interface where users can ask questions about legal topics."

### When something breaks

Paste the error message to your assistant:

> "I'm getting this error: [paste the error]"

It will diagnose the problem and fix it.

---

## Step 6: Deploy to the Internet (When Ready)

When you want to share your app with the world, tell your assistant:

> "Help me deploy this to Netlify."

You'll need:
- A **GitHub account** (free) at [github.com/signup](https://github.com/signup)
- A **Netlify account** (free) at [app.netlify.com/signup](https://app.netlify.com/signup) — sign up with GitHub

**The step everyone forgets:** After connecting your repo to Netlify, you must add your API key to Netlify's settings:
1. Go to **Site configuration** > **Environment variables**
2. Add `GEMINI_API_KEY` with your real key
3. Trigger a redeploy

Your `.env` file only works on your computer. Netlify needs its own copy of those secrets. Without this, your app will load but the AI features won't work.

---

## Quick Reference

| What you want to do | Command |
|---|---|
| Install dependencies | `npm install` |
| Start the dev server | `npm run dev` |
| Check for errors | `npm run typecheck` |
| Build for production | `npm run build` |
| Add a new package | `npm install [package-name]` |

---

## When You're Stuck

1. **Ask your AI assistant first.** Describe the problem in plain language. Paste any error messages.
2. **Restart the dev server.** Press Ctrl+C in the terminal to stop it, then run `npm run dev` again.
3. **Check that `.env` exists** and has your API key in it.
4. **Run `npm install`** — sometimes dependencies get out of sync.
5. **Ask your instructor or Kyle** if the AI can't figure it out.
