# Getting Started — Your First Session

This guide walks you through your very first session with this template and an AI coding assistant. By the end, you'll have a working app running on your computer.

## Before You Begin

Make sure you have:

- [ ] **Node.js** installed — check by opening a terminal and typing `node --version`. If it shows a version number, you're good. If not, [download it here](https://nodejs.org) (choose the LTS version).
- [ ] **A code editor** — [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.com/) are great choices.
- [ ] **A Gemini API key** — Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey), sign in with Google, and click "Create API Key." Copy it somewhere safe.

## Step 1: Open the Project

Open your code editor and open this folder as a project. In VS Code, that's File > Open Folder.

## Step 2: Set Up Your Environment

Open a terminal (in VS Code: Terminal > New Terminal) and run:

```bash
npm install
```

This downloads all the code libraries your app needs. It might take a minute.

Then, create your environment file:

```bash
cp .env.example .env
```

Open the `.env` file and replace `your-gemini-api-key-here` with your actual API key.

**Important:** The `.env` file contains your secrets. It will never be uploaded to GitHub or shared — that's by design.

## Step 3: Start the App

```bash
npm run dev
```

Open your browser to **http://localhost:5173**. You should see the Launchpad landing page with a demo that lets you talk to Gemini.

Try typing a question and clicking "Send to Gemini." If you get a response, everything is working!

## Step 4: Import Your Project (Optional)

If you have an export from AI Studio, Bolt, or another platform, now is the time to bring it in.

Open your AI coding assistant and say:

> "I have an export from [AI Studio / Bolt / Replit / etc.] at [file path or folder]. Help me import it into this template."

The assistant knows how to handle each platform's export format. It will:
1. Analyze your exported code
2. Identify what needs to change for security
3. Move AI calls to the server (to protect your API key)
4. Set up the UI in the right places
5. Test that everything works

## Step 5: Start Building

Now you can start customizing and adding features. Some things to try:

- **Change the look:** Edit `app/routes/home.tsx` to change colors, text, layout
- **Add a new AI feature:** Tell your assistant "Help me add a feature that [describes what you want]"
- **Add a new page:** Tell your assistant "Help me add a page for [purpose]"
- **Deploy to the internet:** Tell your assistant "Help me deploy this to Netlify"

## Useful Commands

| Command | What It Does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run typecheck` | Checks for code errors |
| `npm install [package]` | Adds a new code library |

## How to Talk to Your AI Assistant

Your AI assistant has been given detailed instructions (in `CLAUDE.md`) about this project. Here are some effective ways to ask for help:

**Be specific about what you want:**
- "Add a button that analyzes the text in the textarea and shows the result below it"
- "Make the header maroon with gold text"
- "Add a new page at /about that shows information about the project"

**When something breaks:**
- "I'm getting this error: [paste the error message]"
- "The page is blank when I go to /my-page"
- "The Gemini call isn't returning anything"

**When you're exploring:**
- "Explain what the routes.ts file does"
- "How do I add a new section to the home page?"
- "What's the difference between a component and a route?"

## What's Next?

Once you're comfortable with the basics:

1. **Add more AI features** — structured output, document analysis, chat interfaces
2. **Add authentication** — if your app needs to know who's using it
3. **Deploy** — get your app live on the internet (see below)
4. **Share** — send the URL to people and get feedback

Remember: your AI assistant is your technical partner. Don't be afraid to ask it anything — that's what it's there for.

## Deploying Your App

When you're ready to put your app on the internet, tell your AI assistant: "Help me deploy this to Netlify." It will walk you through every step.

The key things you'll need:
- A **GitHub account** (free) — this is where your code lives online
- A **Netlify account** (free) — this is what turns your code into a live website

**Important: Don't forget to add your API keys to Netlify!** Your `.env` file only works on your computer. When your app runs on Netlify, it needs its own copy of those secrets:

1. In Netlify, go to **Site configuration** > **Environment variables**
2. Add each variable from your `.env` file (like `GEMINI_API_KEY`)
3. Trigger a redeploy

Without this step, your app will load but any AI features will fail with an error. This is the #1 thing people miss on their first deploy.
