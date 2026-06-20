import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";

export function HeroVideo() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
    >
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="https://assets.mixkit.co/videos/4787/4787-720.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/95" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0_0_0/0.35),_transparent_60%)]" />

      {/* Decorative floating orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[3%] bottom-[18%] h-56 w-56 rounded-full bg-primary-foreground/5 blur-2xl animate-float-slow" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[28%] bottom-[8%] h-40 w-40 rounded-full bg-gold/8 blur-2xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24 md:min-h-[92vh] md:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/90 backdrop-blur animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Est. 1998 — A 501(c)(3) Nonprofit
          </span>
          <h1
            id="hero-heading"
            className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up delay-200"
          >
            Building hope.<br />
            <span className="italic text-gold">Funding lasting change.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg animate-fade-up delay-300">
            The Hauser Foundation partners with local leaders to deliver education, health,
            and economic opportunity to communities that need it most — with full
            transparency on every dollar.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up delay-500">
            <Link
              to="/donate"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-gold-foreground shadow-lg shadow-black/25 transition-all hover:scale-[1.03] hover:shadow-xl"
            >
              Donate now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/8 px-7 py-3.5 text-base font-semibold text-primary-foreground backdrop-blur transition-all hover:bg-primary-foreground/18 hover:scale-[1.02]"
            >
              Explore our programs
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-primary-foreground/15 pt-10 animate-fade-up delay-700">
            {[
              { val: "1.2M+", label: "Lives reached" },
              { val: "94¢", label: "Per $ to programs" },
              { val: "32", label: "Countries" },
              { val: "240+", label: "Community partners" },
            ].map((t) => (
              <div key={t.label} className="flex flex-col gap-0.5">
                <span className="font-serif text-2xl font-semibold text-gold">{t.val}</span>
                <span className="text-xs text-primary-foreground/65 uppercase tracking-wider">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700">
        <div className="h-9 w-5 rounded-full border border-primary-foreground/30 flex justify-center pt-1.5">
          <div className="h-2 w-1 rounded-full bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
