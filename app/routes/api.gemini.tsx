/**
 * Server-side API route for Gemini calls.
 *
 * This route runs ONLY on the server. The API key never reaches the browser.
 *
 * Frontend components call this via useFetcher:
 *   const fetcher = useFetcher();
 *   fetcher.submit(
 *     { prompt: "Your prompt here" },
 *     { method: "POST", action: "/api/gemini", encType: "application/json" }
 *   );
 *   // Result appears in fetcher.data.result
 */

import { generateText } from "~/lib/gemini.server";
import type { Route } from "./+types/api.gemini";

export async function action({ request }: Route.ActionArgs) {
  try {
    const body = await request.json();
    const { prompt, systemInstruction } = body;

    if (!prompt || typeof prompt !== "string") {
      return { error: "Missing or invalid 'prompt' in request body" };
    }

    const result = await generateText(prompt, { systemInstruction });

    return { result };
  } catch (error) {
    console.error("Gemini API error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return { error: message };
  }
}

// This route has no UI — it's an API-only route
export default function GeminiAPI() {
  return null;
}
