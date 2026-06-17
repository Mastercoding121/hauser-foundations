import { Link } from "@tanstack/react-router";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/about", label: "About" },
  { to: "/transparency", label: "Transparency" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
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
                  activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-secondary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/donate"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md min-h-11"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-md text-foreground hover:bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                  activeProps={{ className: "block rounded-md px-3 py-3 text-base font-semibold text-primary bg-secondary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-3">
              <Link
                to="/donate"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-semibold text-primary-foreground"
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
