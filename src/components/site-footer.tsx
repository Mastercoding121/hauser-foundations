import { Link } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface text-surface-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
              <Heart className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-serif text-xl font-semibold">Hauser Foundation</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            A registered 501(c)(3) nonprofit advancing education, health, and community
            development through transparent, accountable giving.
          </p>
          <div className="mt-6 space-y-2">
            <a href="mailto:hello@hauserfoundation.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              hello@hauserfoundation.org
            </a>
            <a href="tel:+18005551234" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              +1 (800) 555-1234
            </a>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
              312 Garden Street, Boston MA 02114
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/programs" className="text-muted-foreground hover:text-foreground transition-colors">Programs</Link></li>
            <li><Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">Impact Stories</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/transparency" className="text-muted-foreground hover:text-foreground transition-colors">Transparency</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Get involved</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/donate" className="text-muted-foreground hover:text-foreground transition-colors">Donate</Link></li>
            <li><Link to="/transparency" className="text-muted-foreground hover:text-foreground transition-colors">Financial reports</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Partner with us</Link></li>
          </ul>
          <div className="mt-8">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Certified by</p>
            <div className="flex gap-2">
              <span className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground">★★★★ Charity Navigator</span>
            </div>
          </div>
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
