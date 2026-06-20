import { Link } from "@tanstack/react-router";
import { Heart, Database } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/programs", label: "Programs", exact: false },
  { to: "/stories", label: "Stories", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/transparency", label: "Reports", exact: false },
  { to: "/grants", label: "Grants", exact: false, icon: true },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-2 md:h-[4.25rem]">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 group"
          aria-label="Hauser Foundation, home"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm transition-transform group-hover:scale-110"
          >
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
          </span>
          <span className="font-serif text-base font-semibold tracking-tight text-foreground sm:text-[17px]">
            Hauser Foundation
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[13px] font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                  activeProps={{
                    className: "inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[13px] font-semibold text-foreground bg-secondary",
                  }}
                  activeOptions={{ exact: item.exact }}
                >
                  {"icon" in item && item.icon && (
                    <Database className="h-3 w-3 text-primary" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/donate"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-br from-primary to-primary/85 px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.04] hover:shadow-md"
        >
          <Heart className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          Donate
        </Link>
      </div>
    </header>
  );
}
