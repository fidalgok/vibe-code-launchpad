import { useState } from "react";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";

/**
 * Home page — starter landing page for your app.
 *
 * This is where you'll build your main UI. The template includes
 * a simple demo that talks to the Gemini API through the safe
 * server-side route at /api/gemini.
 *
 * Replace this entire component with your own app!
 */
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError("Could not reach the server. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Vibe Code Launchpad</h1>
            <p className="text-xs text-slate-400">
              Your AI-powered app starts here
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          {/* Welcome */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Template is working!
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Your app is ready to build
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
              This starter template connects to Google Gemini safely through a
              server-side route. Try it out below, then replace this page with
              your own app.
            </p>
          </div>

          {/* Demo Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Ask Gemini anything
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Explain what an API key is in simple terms..."
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                "Thinking..."
              ) : (
                <>
                  Send to Gemini <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Gemini Response
              </h3>
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-slate-100 rounded-lg p-6 text-sm text-slate-600 space-y-2">
            <h3 className="font-semibold text-slate-800">Next steps:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Replace this page with your exported app code
              </li>
              <li>
                Move any AI/Gemini calls to use the{" "}
                <code className="bg-slate-200 px-1 rounded">/api/gemini</code>{" "}
                route
              </li>
              <li>
                Ask your AI assistant: &quot;Help me import my exported
                project&quot;
              </li>
              <li>
                When ready, deploy to Netlify with one command
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
