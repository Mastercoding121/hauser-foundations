import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

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
    <section aria-labelledby="newsletter-heading" className="bg-primary text-primary-foreground">
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Stay informed</p>
            <h2
              id="newsletter-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Quarterly impact reports, straight to your inbox.
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/85">
              No spam. No filler. Just the numbers, stories, and decisions behind every
              program we fund.
            </p>
          </div>
          <form onSubmit={onSubmit} noValidate className="w-full">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
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
                className="min-h-12 w-full rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-5 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/60 backdrop-blur focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-base font-semibold text-gold-foreground shadow-md transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {status === "success" && <Check className="h-4 w-4" aria-hidden="true" />}
                {status === "success" ? "Subscribed" : status === "loading" ? "Subscribing" : "Subscribe"}
              </button>
            </div>
            <div aria-live="polite" className="mt-3 min-h-5 text-sm">
              {status === "error" && (
                <p id="newsletter-error" className="text-destructive-foreground/95 bg-destructive/30 inline-block rounded px-2 py-0.5">
                  {error}
                </p>
              )}
              {status === "success" && (
                <p className="text-primary-foreground/90">Thank you — please check your inbox to confirm.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
