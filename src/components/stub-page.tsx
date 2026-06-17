import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function makeStubRoute(title: string, description: string) {
  return function StubPage() {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <section className="container-page py-24 md:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Coming next</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
            <Link
              to="/"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Back to home
            </Link>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  };
}

// Re-export for routes
export { createFileRoute };
