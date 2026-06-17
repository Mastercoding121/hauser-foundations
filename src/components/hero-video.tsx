import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";

export function HeroVideo() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Background video with poster fallback */}
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
        <source
          src="https://assets.mixkit.co/videos/4787/4787-720.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay for legibility (WCAG contrast) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/95"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0_0_0/0.35),_transparent_60%)]"
      />

      <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24 md:min-h-[92vh] md:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/90 backdrop-blur">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            Est. 1998 — A 501(c)(3) Nonprofit
          </span>
          <h1
            id="hero-heading"
            className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Building hope.<br />
            <span className="italic text-gold">Funding lasting change.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            The Hauser Foundation partners with local leaders to deliver education, health,
            and economic opportunity to communities that need it most — with full
            transparency on every dollar.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/donate"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-gold-foreground shadow-lg shadow-black/20 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              Donate now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/5 px-7 py-3.5 text-base font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/15"
            >
              Explore our programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
