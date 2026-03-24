---
name: deploy
description: Guide a non-technical user through deploying this app to Netlify, including GitHub setup, Netlify account creation, environment variable configuration, and troubleshooting build failures.
version: "1.0.0"
trigger: user-invoked
metadata:
  sharing: team
---

# Deploy to Netlify

You are walking a non-technical user through deploying their app to the internet. Be extremely specific about every click, every button, every URL. Assume they have never used GitHub or Netlify before.

## Pre-Flight Check

Before starting deployment, verify:

1. Run `npm run build` — does it succeed?
2. Run `npm run typecheck` — any errors?
3. Check that `.env` is in `.gitignore`
4. Check that no API keys are hardcoded in source files

If any checks fail, fix them first and explain what was wrong.

## Phase 1: GitHub Setup

### If they don't have a GitHub account:

> "First, we need to put your code on GitHub. GitHub is like Google Drive for code — it stores your project and lets Netlify automatically update your site when you make changes."

1. Go to https://github.com/signup
2. Create an account with your email
3. Verify your email address

### If they don't have Git installed:

Check with: `git --version`

If not installed:
- **Mac:** "Open Terminal and run: `xcode-select --install` — this installs Git along with other developer tools. Click 'Install' when prompted."
- **Windows:** "Go to https://git-scm.com/download/win and download the installer. Run it with all default settings."

### Initialize and Push

Walk them through each command, one at a time:

```bash
# Initialize Git in the project folder
git init

# Stage all files for commit
git add .

# Create the first commit
git commit -m "Initial commit - app ready for deployment"
```

Then:
1. Go to https://github.com/new
2. Name the repository (suggest: their app name, lowercase, hyphens instead of spaces)
3. Keep it Public (or Private if they prefer)
4. Do NOT check "Add a README" (we already have one)
5. Click "Create repository"
6. GitHub will show commands — use the "push an existing repository" section:

```bash
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

They may be prompted to authenticate — walk them through GitHub's credential process.

## Phase 2: Netlify Setup

### Create Netlify Account

1. Go to https://app.netlify.com/signup
2. Click "Sign up with GitHub" (easiest — connects the accounts)
3. Authorize Netlify to access GitHub

### Connect the Repository

1. From the Netlify dashboard, click **"Add new site"**
2. Click **"Import an existing project"**
3. Choose **GitHub** as the provider
4. Find and select their repository (they may need to configure Netlify's GitHub access)
5. **Build settings** should auto-populate:
   - Build command: `npm run build`
   - Publish directory: `build/client`
   - If these are wrong, set them manually
6. Click **"Deploy site"**

The first deploy will likely FAIL — that's expected because we haven't set the environment variables yet.

## Phase 3: Environment Variables

> "The deploy probably failed because Netlify doesn't have your API key yet. Remember, we keep the key out of the code for security — we need to tell Netlify about it separately."

1. In Netlify, go to **Site configuration** (left sidebar)
2. Click **Environment variables**
3. Click **"Add a variable"**
4. Add each variable from `.env.example`:
   - Key: `GEMINI_API_KEY`
   - Value: (their actual API key)
5. Click **Save**

### Trigger a Redeploy

1. Go to **Deploys** in the left sidebar
2. Click **"Trigger deploy"** > **"Deploy site"**
3. Wait for the build to complete (usually 1-2 minutes)

## Phase 4: Verify

1. Click the site URL that Netlify provides (something like `https://random-name-12345.netlify.app`)
2. Test the app — does everything work?
3. Test any AI features — do Gemini calls return results?

### If Something's Wrong

**Build failed — check the logs:**
- Go to Deploys > click the failed deploy > read the log
- Common issues:
  - Missing dependency: `npm install [package]`, commit, push
  - TypeScript error: fix the error locally, commit, push
  - Environment variable missing: add it in Netlify's settings

**Site loads but AI features don't work:**
- Check that `GEMINI_API_KEY` is set correctly in Netlify
- Check the browser console (F12 > Console tab) for error messages
- Check Netlify Functions logs (Site > Functions) for server-side errors

**404 errors on page refresh:**
- This shouldn't happen with our SSR setup, but if it does, check `netlify.toml`

## Phase 5: Custom Domain (Optional)

If they want a nicer URL:

1. In Netlify, go to **Domain management**
2. Click **"Add a domain"**
3. They can either:
   - Use Netlify's free subdomain (change the random name to something meaningful)
   - Connect a custom domain they own

To change the Netlify subdomain:
1. Site configuration > Site name > Change site name
2. Pick something like `my-legal-tool.netlify.app`

## Ongoing Deployments

After the initial setup, deploying updates is simple:

```bash
git add .
git commit -m "Description of what changed"
git push
```

Netlify will automatically rebuild and deploy. The student can watch the progress in the Netlify dashboard.

> "From now on, every time you push code to GitHub, your site automatically updates. That's it — you just `git add`, `git commit`, `git push` and your changes are live in about a minute."
