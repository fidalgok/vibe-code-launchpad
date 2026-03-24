---
name: add-api-route
description: Add a new server-side API route for AI features. Ensures API keys stay safe by creating the server function, the route handler, and the frontend fetch call as a connected set.
version: "1.0.0"
trigger: user-invoked
metadata:
  sharing: team
---

# Add a Server-Side API Route

You are helping a non-technical user add a new AI-powered feature to their app. This skill ensures the API key stays safe on the server.

## Step 1: Understand the Feature

Ask the user:
- "What should this feature do? Describe it like you'd describe it to a friend."
- "What information does the user provide?" (text input, file upload, button click, etc.)
- "What should the AI return?" (text, structured data, a list, etc.)

## Step 2: Create the Server Function

Add a new function to `app/lib/gemini.server.ts` or create a new `.server.ts` file if the feature is complex enough to warrant its own module.

**Template:**
```typescript
// app/lib/[feature-name].server.ts
import { generateText, generateJSON } from "~/lib/gemini.server";

export async function [featureName](input: string) {
  return generateText(input, {
    systemInstruction: "You are a [role]. [Instructions for the AI]...",
  });
}
```

For structured output (when you need specific fields back):
```typescript
import { generateJSON } from "~/lib/gemini.server";
import { Type } from "@google/genai";

export async function [featureName](input: string) {
  return generateJSON(input, {
    type: Type.OBJECT,
    properties: {
      // Define the shape of the response
      summary: { type: Type.STRING, description: "A brief summary" },
      score: { type: Type.NUMBER, description: "A score from 1-10" },
    },
  });
}
```

## Step 3: Create the Route

**Option A: Standalone API route** (if the feature is called from JavaScript)

Create `app/routes/api.[feature-name].tsx`:
```typescript
import { [featureName] } from "~/lib/[feature-name].server";

export async function action({ request }) {
  const body = await request.json();
  // Validate input
  if (!body.input || typeof body.input !== "string") {
    return Response.json({ error: "Missing input" }, { status: 400 });
  }
  try {
    const result = await [featureName](body.input);
    return Response.json({ result });
  } catch (error) {
    console.error("[Feature] error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export default function () { return null; }
```

Register in `app/routes.ts`:
```typescript
route("api/[feature-name]", "routes/api.[feature-name].tsx"),
```

**Option B: Route action** (if the feature is part of an existing page)

Add an `action` function to the existing route file and use `useFetcher` in the component.

## Step 4: Wire Up the Frontend

Show the user how to call the new endpoint:

```typescript
const response = await fetch("/api/[feature-name]", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: userInput }),
});
const data = await response.json();
```

Or with React Router's `useFetcher` (better for forms):
```typescript
import { useFetcher } from "react-router";

function MyComponent() {
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "submitting";

  return (
    <fetcher.Form method="post" action="/api/[feature-name]">
      <input name="input" />
      <button disabled={isLoading}>
        {isLoading ? "Processing..." : "Submit"}
      </button>
      {fetcher.data?.result && <p>{fetcher.data.result}</p>}
    </fetcher.Form>
  );
}
```

## Step 5: Test

1. Run `npm run dev`
2. Test the feature in the browser
3. Check the terminal for any server-side errors
4. Run `npm run typecheck`

## Security Checklist

Before finishing, verify:
- [ ] No `process.env.GEMINI_API_KEY` in any non-`.server.ts` file
- [ ] The API route validates its input
- [ ] Error messages don't leak sensitive information
- [ ] The new route is registered in `app/routes.ts`
