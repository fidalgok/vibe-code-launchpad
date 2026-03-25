/**
 * Server-side API route for Gemini calls.
 *
 * This route runs ONLY on the server. The API key never reaches the browser.
 *
 * Frontend components call this via fetch:
 *   const response = await fetch("/api/gemini", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ prompt: "Your prompt here" }),
 *   });
 *   const data = await response.json();
 *   console.log(data.result);
 */

import { generateText } from "~/lib/gemini.server";
import type { Route } from "./+types/api.gemini";

export async function action({ request }: Route.ActionArgs) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { prompt, systemInstruction } = body;

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { error: "Missing or invalid 'prompt' in request body" },
        { status: 400 },
      );
    }

    const result = await generateText(prompt, { systemInstruction });

    return Response.json({ result });
  } catch (error) {
    console.error("Gemini API error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return Response.json({ error: message }, { status: 500 });
  }
}

// This route has no UI — it's an API-only route
export default function GeminiAPI() {
  return null;
}
