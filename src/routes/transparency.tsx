import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { FileText, ShieldCheck, Download, ExternalLink } from "lucide-react";
import heroImg from "@/assets/transparency-hero.jpg";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency & Reports — Hauser Foundation" },
      { name: "description", content: "Financial reports, 990 filings, privacy policy, and a clear breakdown of how every donated dollar is used." },
      { property: "og:title", content: "Transparency & Financial Reports" },
      { property: "og:description", content: "How we use your funds, annual audits, and public filings." },
    ],
  }),
  component: TransparencyPage,
});

const allocation = [
  { label: "Programs & grants", pct: 84, color: "var(--color-primary)" },
  { label: "Program operations", pct: 10, color: "var(--color-gold)" },
  { label: "Fundraising", pct: 4, color: "oklch(0.55 0.08 160)" },
  { label: "Administration", pct: 2, color: "oklch(0.7 0.02 160)" },
];

const reports = [
  { year: "2024", title: "Annual Impact Report", size: "4.2 MB" },
  { year: "2024", title: "Form 990 (IRS)", size: "1.8 MB" },
  { year: "2024", title: "Independent Audit", size: "2.6 MB" },
  { year: "2023", title: "Annual Impact Report", size: "3.9 MB" },
  { year: "2023", title: "Form 990 (IRS)", size: "1.7 MB" },
];

function TransparencyPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          width={1600}
          height={896}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        <div className="container-page py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Transparency</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Every dollar, <span className="italic text-gold">accounted for.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/90 md:text-lg">
            Independent audits, public filings, and quarterly impact reports.
            We publish what we spend and what it accomplishes.
          </p>
        </div>
      </section>

      {/* Allocation */}
      <section aria-labelledby="allocation-heading" className="bg-background">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:items-center md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How we use your funds</p>
            <h2 id="allocation-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              94¢ of every dollar goes to programs.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Verified annually by an independent auditor. The remaining 6¢ keeps the lights on,
              processes your gift securely, and reaches more donors who want to give well.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <ul className="space-y-5">
              {allocation.map((a) => (
                <li key={a.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-foreground">{a.label}</span>
                    <span className="font-serif text-lg font-semibold text-foreground">{a.pct}%</span>
                  </div>
                  <div
                    className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={a.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={a.label}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${a.pct}%`, backgroundColor: a.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section aria-labelledby="reports-heading" className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Financial reports</p>
            <h2 id="reports-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Audits, 990s, and impact reports.
            </h2>
          </div>
          <ul className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            {reports.map((r) => (
              <li key={`${r.year}-${r.title}`} className="flex items-center gap-4 p-5">
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-base font-semibold text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.year} · PDF · {r.size}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                  aria-label={`Download ${r.year} ${r.title}`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Download</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Policies */}
      <section aria-labelledby="policies-heading" className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Policies</p>
            <h2 id="policies-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Privacy, security & governance.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { Icon: ShieldCheck, title: "Privacy policy", body: "We never sell donor data. PCI-DSS-compliant payment processing." },
              { Icon: FileText, title: "Donor bill of rights", body: "You have the right to know how your gift is used — and to update or revoke at any time." },
              { Icon: ExternalLink, title: "Charity Navigator", body: "We hold a 4-star rating with full encyclopedia transparency on financial health." },
            ].map(({ Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
