# Getting Started

This guide walks you through your very first session with this template. By the end, you'll have a working app running on your computer and an AI coding assistant ready to help you build.

> **The #1 thing to remember:** When you get stuck at any point in this guide — or at any point while building — **ask your AI coding assistant for help.** That's what it's there for. Paste the error message, describe what you're trying to do, and let it figure it out. The AI already knows everything about this project and how to help you.

---

## Before You Begin

You need three things installed and one account set up. This takes about 15 minutes.

**If you run into trouble installing anything below, ask your AI assistant for help once you have it set up (Step 2). It can walk you through troubleshooting.**

### 1. Install Node.js

Node.js is what runs your app on your computer.

1. Go to the [Node.js download page](https://nodejs.org/en/download)
2. Download the **LTS** version (currently v24) for your operating system

**Mac users — which download do I pick?**
Click the Apple menu () in the top-left corner of your screen and choose **"About This Mac."**
- If you see **Chip** followed by "M1," "M2," "M3," or "M4" → download the **ARM64** version
- If you see **Processor** followed by "Intel" → download the **x64** version
- Any Mac from 2021 or later is almost certainly ARM64

**Windows users:**
Choose the **x64** installer unless you know you have an ARM-based Windows device (like a Surface Pro X). If you're not sure, x64 is almost always correct.

3. Run the installer with all the default settings
4. To verify it worked, open a terminal and type: `node --version`
   - **Mac:** Open the app called "Terminal" (search for it in Spotlight)
   - **Windows:** Open "Command Prompt" or "PowerShell" from the Start menu
   - You should see something like `v24.14.1`. Any v24+ means you're good.

### 2. Install an AI Coding Tool

You need an AI assistant that can read and edit the files in your project. All three options below are desktop apps — pick whichever fits your situation:

| Tool | What it feels like | Cost |
|---|---|---|
| **[Claude Code Desktop](https://code.claude.com/docs/en/desktop-quickstart)** | A desktop app you point at your project folder. You chat, it builds. | Claude Pro ($20/mo) or Max ($100/mo). |
| **[OpenAI Codex](https://openai.com/codex/)** | Similar desktop app experience. Chat with AI, it writes the code. | Free to start with a ChatGPT account. |
| **[Cursor](https://cursor.com)** | A full code editor with AI chat built in. More like a professional developer tool. | Free tier with generous usage. Supports Claude, GPT-5, Gemini, and more. |

**Not sure which to pick?** If you already pay for Claude, grab **Claude Code Desktop**. If you use ChatGPT, try **Codex** (it's free to start). If you don't have either, **Cursor** has a free tier that works great. All three will read this project's instructions and know how to help you.

### 3. Get a Gemini API Key

This is a free key that lets your app talk to Google's AI. You need this for the AI features in your app (separate from the AI coding tool above).

**If your instructor provided a key for the class:** Use that! Skip to Step 1.

**If you need your own key:**

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with a **personal Google account** (not your school/work account — many institutions block access to AI Studio)
3. Click **"Create API Key"**
4. Copy the key and save it somewhere safe (you'll need it in a minute)

**BC students:** Your BC Google account won't work with AI Studio. Use a personal Gmail account instead. If you don't have one, you can create a free Google account at [accounts.google.com](https://accounts.google.com/signup).

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
- **Claude Code Desktop:** Open the app, click "Open Project", select the folder
- **Codex / Claude Code CLI:** Open a terminal, `cd path/to/your/project`, then type `codex` or `claude`

**From this point forward, your AI assistant can help you with every remaining step.** If anything below is confusing, just ask it: "Help me set up this project."

---

## Step 3: Set Up Your Settings

Open a terminal inside your tool:
- **Cursor:** Terminal > New Terminal (or press Ctrl+\` on the keyboard)
- **Claude Code / Codex:** You're already in the terminal

Run this command to install the code libraries your app needs:

```
npm install
```

This downloads everything. It might take a minute — that's normal.

Next, you need to create a settings file for your API key. You have a few options:

**Option A — Ask your AI assistant:**
> "Help me set up the .env file with my Gemini API key."

It will create the file and tell you where to paste your key.

**Option B — Use a command:**
```
cp .env.example .env
```
(On Windows, use `copy .env.example .env` instead)

**Option C — Do it manually:**
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

**Something went wrong?** Ask your AI assistant: "I ran npm run dev but [describe what happened]." Paste any error messages you see.

---

## Step 5: Start Building with Your AI Assistant

Now the fun part. Open the AI chat in your tool:

- **Cursor:** Click the chat icon in the sidebar (or press Cmd+L / Ctrl+L)
- **Claude Code Desktop:** The chat is the main interface — just type
- **Codex / Claude Code CLI:** Just type in the terminal — it's already your chat

Your AI assistant already knows about this project. It's been given detailed instructions (in the `AGENTS.md` file) about the technology, the security rules, and how to help non-technical users. You don't need to explain any of that — just describe what you want.

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

1. **Ask your AI assistant first.** This is always step one. Describe the problem in plain language. Paste any error messages. It knows this project inside and out.
2. **Restart the dev server.** Press Ctrl+C in the terminal to stop it, then run `npm run dev` again.
3. **Check that `.env` exists** and has your API key in it.
4. **Run `npm install`** — sometimes dependencies get out of sync.
5. **Ask your instructor or Kyle** if the AI can't figure it out.
