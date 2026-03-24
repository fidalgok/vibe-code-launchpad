---
name: add-auth
description: Add authentication to the app using React Router cookie sessions. Covers simple password protection, Google OAuth, and route protection patterns.
version: "1.0.0"
trigger: user-invoked
metadata:
  sharing: team
---

# Add Authentication

You are helping a non-technical user add authentication to their app. Start by understanding what they actually need.

## Step 1: Determine the Auth Type

Ask the user:
- "Who should be able to use your app?"
  - **Everyone** → You might not need auth at all
  - **Only specific people (like classmates)** → Simple password or invite code
  - **Anyone with a Google account** → Google OAuth
  - **Anyone, but they need their own account** → Username/password signup

Recommend the simplest option that meets their needs. For classroom use, a shared password is often sufficient.

## Option A: Simple Password Protection

The easiest option — one shared password that grants access.

### 1. Create the session helper

Create `app/lib/session.server.ts`:

```typescript
import { createCookieSessionStorage, redirect } from "react-router";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function requireAuth(request: Request) {
  const session = await getSession(request);
  if (!session.get("authenticated")) {
    throw redirect("/login");
  }
  return session;
}

export async function createAuthSession(redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("authenticated", true);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function destroyAuthSession(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
```

### 2. Add environment variables

Add to `.env`:
```
SESSION_SECRET=generate-a-long-random-string-here
APP_PASSWORD=the-shared-password-for-your-class
```

Add to `.env.example`:
```
SESSION_SECRET=generate-a-random-string-here
APP_PASSWORD=set-your-app-password
```

### 3. Create a login page

Create `app/routes/login.tsx` with a simple password form.

### 4. Protect routes

In any route that needs protection, add to the loader:
```typescript
import { requireAuth } from "~/lib/session.server";

export async function loader({ request }) {
  await requireAuth(request);
  // ... rest of loader
}
```

### 5. Register routes

Add to `app/routes.ts`:
```typescript
route("login", "routes/login.tsx"),
route("logout", "routes/logout.tsx"),
```

## Option B: Google OAuth

More complex but provides real user identity. Only recommend this if the user actually needs to know WHO is logged in.

### Prerequisites
The user needs to:
1. Go to https://console.cloud.google.com
2. Create a project (or use an existing one)
3. Go to APIs & Services > Credentials
4. Create OAuth 2.0 Client ID (Web application type)
5. Add authorized redirect URI: `http://localhost:5173/auth/callback` (dev) and their production URL

### Implementation

Create these files:
- `app/lib/auth.server.ts` — OAuth URL generation, token exchange, user info fetch
- `app/lib/session.server.ts` — Cookie session with user data
- `app/routes/signin.tsx` — Redirects to Google
- `app/routes/auth.callback.tsx` — Handles the OAuth callback
- `app/routes/signout.tsx` — Destroys the session

Add environment variables:
```
SESSION_SECRET=random-string
GOOGLE_CLIENT_ID=from-google-console
GOOGLE_CLIENT_SECRET=from-google-console
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

### Route Protection Pattern

Create a layout route that checks auth:

```typescript
// app/routes/layout.tsx
import { requireUser } from "~/lib/session.server";

export async function loader({ request }) {
  const user = await requireUser(request);
  return { user };
}

export default function AuthLayout() {
  return <Outlet />;
}
```

Then nest protected routes under this layout in `app/routes.ts`.

## After Implementation

1. Test the login flow locally
2. Test that protected routes redirect to login
3. Test that the session persists across page refreshes
4. Add `SESSION_SECRET` (and OAuth credentials if applicable) to Netlify environment variables
5. Update `GOOGLE_REDIRECT_URI` to the production URL on Netlify

## Explain to the User

> "Authentication is how your app knows who's using it. We're using 'cookie sessions' — when someone logs in, the server creates a small encrypted note (called a cookie) that their browser stores. Every time they visit a page, the browser sends that cookie back, and the server checks it to confirm they're logged in. It's the same system that keeps you logged into Gmail or Netflix."
