import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/programs", label: "Programs", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/transparency", label: "Transparency", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Hauser Foundation, home"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Hauser Foundation
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{
                    className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-secondary",
                  }}
                  activeOptions={{ exact: item.exact }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/donate"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
        >
          Donate
        </Link>
      </div>
    </header>
  );
}
