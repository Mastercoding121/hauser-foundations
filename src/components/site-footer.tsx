import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface text-surface-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-serif text-xl font-semibold">Hauser Foundation</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A registered 501(c)(3) nonprofit organization advancing education, health,
            and community development through transparent, accountable giving.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/programs" className="text-muted-foreground hover:text-foreground">Programs</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link to="/transparency" className="text-muted-foreground hover:text-foreground">Transparency</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Get involved</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/donate" className="text-muted-foreground hover:text-foreground">Donate</Link></li>
            <li><Link to="/transparency" className="text-muted-foreground hover:text-foreground">Financial reports</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Partner with us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Hauser Foundation. EIN 00-0000000. All rights reserved.</p>
          <p>Built with care for the communities we serve.</p>
        </div>
      </div>
    </footer>
  );
}
