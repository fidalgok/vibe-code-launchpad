import { useState } from "react";
import {
  Sparkles,
  Rocket,
  ArrowRight,
  BookOpen,
  Github,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

/**
 * Home page — landing page + Gemini demo.
 *
 * Replace this with your own app once you've imported your project!
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
      console.error("Error calling Gemini API:", err);
      setError("Could not reach the server. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-[#8B1A1A] text-white px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#C9A84C] p-2 rounded-lg">
              <Rocket className="w-5 h-5 text-[#8B1A1A]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Vibe Code Launchpad
              </h1>
              <p className="text-xs text-[#C9A84C] font-medium">
                Boston College
              </p>
            </div>
          </div>
          <a
            href="https://github.com/fidalgok/vibe-code-launchpad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Get the Template</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              You built something cool.
              <br />
              <span className="text-[#8B1A1A]">Now make it real.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Take your AI prototype from a vibe-coding platform and turn it
              into a real app — deployed, secure, and yours. Your AI coding
              assistant handles the technical parts. You drive the vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/fidalgok/vibe-code-launchpad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#8B1A1A] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#6B1414] transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                Use This Template
              </a>
              <a
                href="https://github.com/fidalgok/vibe-code-launchpad/blob/main/GETTING-STARTED.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                Getting Started Guide
              </a>
            </div>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Import your prototype
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Built something in AI Studio, Bolt, Replit, or Lovable? Your AI
                assistant knows how to bring it in and restructure it safely.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Secure by default
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                API keys stay on the server where they belong. No accidental
                exposure. The template handles security so you can focus on
                building.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Deploy to the world
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Push to GitHub, Netlify handles the rest. Your app gets a real
                URL you can share — automatically updated every time you make
                changes.
              </p>
            </div>
          </div>

          {/* Try It Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="font-semibold text-slate-800">
                  Try it — this app is talking to Gemini right now
                </h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                This demo uses the same secure server-side route your app will
                use. The API key never touches the browser.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask anything — e.g., 'Draft a demand letter for a slip-and-fall case' or 'Explain consideration in contract law'"
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] resize-y"
                />

                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="flex items-center gap-2 bg-[#8B1A1A] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#6B1414] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {result && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                    Gemini Response
                  </h4>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-slate-400 pb-8">
            <p>
              Built by{" "}
              <a
                href="https://github.com/fidalgok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-700 underline underline-offset-2"
              >
                Kyle Fidalgo
              </a>{" "}
              for BC Law&apos;s vibe-coding curriculum. React Router + Tailwind
              + Gemini + Netlify.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
