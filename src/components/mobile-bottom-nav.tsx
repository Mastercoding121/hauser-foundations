import { Link } from "@tanstack/react-router";
import { Home, HandHeart, Users, FileBarChart, Mail } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/programs", label: "Programs", icon: HandHeart, exact: false },
  { to: "/about", label: "About", icon: Users, exact: false },
  { to: "/transparency", label: "Reports", icon: FileBarChart, exact: false },
  { to: "/contact", label: "Contact", icon: Mail, exact: false },
] as const;

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:hidden"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5">
        {items.map(({ to, label, icon: Icon, exact }) => (
          <li key={to} className="contents">
            <Link
              to={to}
              activeOptions={{ exact }}
              aria-label={label}
              className="group flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className:
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-semibold text-primary",
              }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
