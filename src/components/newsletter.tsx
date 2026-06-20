import { useState } from "react";
import { Check, Loader2, Mail, Sparkles } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
  };

  return (
    <section aria-labelledby="newsletter-heading" className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-[10%] h-48 w-48 rounded-full bg-primary-foreground/5 blur-2xl animate-float-slow" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-[30%] h-32 w-32 rounded-full bg-gold/6 blur-xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container-page relative py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium text-primary-foreground/90 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span className="uppercase tracking-wider">Stay informed</span>
            </div>
            <h2
              id="newsletter-heading"
              className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Quarterly impact reports,{" "}
              <span className="italic text-gold">straight to your inbox.</span>
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              No spam. No filler. Just the numbers, stories, and decisions behind every
              program we fund.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {["Quarterly impact reports", "Grantee spotlights", "Audit summaries"].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <Check className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-6 backdrop-blur md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl icon-gold">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-semibold">Join 12,000+ subscribers</p>
            </div>
            <form onSubmit={onSubmit} noValidate className="w-full">
              <label htmlFor="newsletter-email" className="block text-sm font-semibold text-primary-foreground/90 mb-2">
                Your email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "newsletter-error" : undefined}
                  disabled={status === "loading" || status === "success"}
                  className="min-h-12 w-full rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-5 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 backdrop-blur focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-base font-semibold text-gold-foreground shadow-md transition-all hover:scale-[1.03] hover:shadow-lg disabled:opacity-70 shrink-0"
                >
                  {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {status === "success" && <Check className="h-4 w-4" aria-hidden="true" />}
                  {status === "success" ? "Subscribed!" : status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              <div aria-live="polite" className="mt-3 min-h-5 text-sm">
                {status === "error" && (
                  <p id="newsletter-error" className="text-red-300">{error}</p>
                )}
                {status === "success" && (
                  <p className="text-primary-foreground/85">🎉 Thank you — please check your inbox to confirm.</p>
                )}
              </div>
            </form>
            <p className="mt-4 text-xs text-primary-foreground/50">We never sell your data. Unsubscribe any time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
