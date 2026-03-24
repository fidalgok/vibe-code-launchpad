/**
 * Gemini API wrapper — SERVER-SIDE ONLY
 *
 * The .server.ts suffix ensures this file is NEVER sent to the browser.
 * This is how we keep the API key safe.
 *
 * Usage from a route action:
 *   import { generateText } from "~/lib/gemini.server";
 *   const result = await generateText("Your prompt here");
 */

import { GoogleGenAI } from "@google/genai";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. " +
        "Copy .env.example to .env and add your API key. " +
        "Get a free key at https://aistudio.google.com/apikey"
    );
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Generate text from a prompt using Gemini.
 *
 * @param prompt - The text prompt to send to Gemini
 * @param options - Optional configuration
 * @returns The generated text response
 */
export async function generateText(
  prompt: string,
  options?: {
    model?: string;
    systemInstruction?: string;
  }
) {
  const ai = getClient();
  const model = options?.model ?? "gemini-2.5-flash-preview-05-20";

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: options?.systemInstruction,
    },
  });

  return response.text ?? "";
}

/**
 * Generate structured JSON from a prompt using Gemini.
 *
 * @param prompt - The text prompt
 * @param schema - A JSON schema object describing the expected output
 * @returns Parsed JSON object matching the schema
 */
export async function generateJSON<T = unknown>(
  prompt: string,
  schema: Record<string, unknown>,
  options?: {
    model?: string;
    systemInstruction?: string;
  }
): Promise<T> {
  const ai = getClient();
  const model = options?.model ?? "gemini-2.5-flash-preview-05-20";

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema as any,
      systemInstruction: options?.systemInstruction,
    },
  });

  return JSON.parse(response.text ?? "{}") as T;
}
