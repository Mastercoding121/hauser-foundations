import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useInView } from "@/hooks/use-in-view";
import { FileText, ShieldCheck, Download, Star, TrendingUp, Lock, Award } from "lucide-react";
import heroImg from "@/assets/transparency-hero.jpg";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency & Reports — Hauser Foundation" },
      { name: "description", content: "Financial reports, 990 filings, privacy policy, and a clear breakdown of how every donated dollar is used." },
    ],
  }),
  component: TransparencyPage,
});

const allocation = [
  { label: "Programs & grants", pct: 84, gradient: "from-emerald-500 to-teal-500", textColor: "text-emerald-600" },
  { label: "Program operations", pct: 10, gradient: "from-blue-500 to-indigo-500", textColor: "text-blue-600" },
  { label: "Fundraising", pct: 4, gradient: "from-violet-500 to-purple-500", textColor: "text-violet-600" },
  { label: "Administration", pct: 2, gradient: "from-amber-400 to-orange-400", textColor: "text-amber-600" },
];

const reports = [
  { year: "2024", title: "Annual Impact Report", size: "4.2 MB", icon: Star, color: "icon-gold" },
  { year: "2024", title: "Form 990 (IRS)", size: "1.8 MB", icon: FileText, color: "icon-blue" },
  { year: "2024", title: "Independent Audit", size: "2.6 MB", icon: ShieldCheck, color: "icon-emerald" },
  { year: "2023", title: "Annual Impact Report", size: "3.9 MB", icon: Star, color: "icon-gold" },
  { year: "2023", title: "Form 990 (IRS)", size: "1.7 MB", icon: FileText, color: "icon-blue" },
];

function AllocationBar({ a, index, visible }: { a: typeof allocation[0]; index: number; visible: boolean }) {
  return (
    <li>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-semibold text-foreground">{a.label}</span>
        <span className={`font-serif text-xl font-semibold ${a.textColor}`}>{a.pct}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={a.pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={a.label}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${a.gradient} transition-all duration-1000 ease-out`}
          style={{
            width: visible ? `${a.pct}%` : "0%",
            transitionDelay: `${200 + index * 150}ms`,
          }}
        />
      </div>
    </li>
  );
}

function TransparencyPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [allocRef, allocInView] = useInView(0.2);
  const [reportsRef, reportsInView] = useInView(0.1);
  const [policiesRef, policiesInView] = useInView(0.1);

  const policies = [
    { Icon: Lock, color: "icon-blue", title: "Privacy policy", body: "We never sell donor data. PCI-DSS-compliant payment processing with full encryption at rest and in transit." },
    { Icon: ShieldCheck, color: "icon-emerald", title: "Donor bill of rights", body: "You have the right to know how your gift is used — and to update or revoke at any time, no questions asked." },
    { Icon: Award, color: "icon-gold", title: "Charity Navigator", body: "We hold a 4-star rating with full encyclopedia transparency on financial health and accountability." },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img src={heroImg} alt="" aria-hidden="true" width={1600} height={896} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div className="container-page py-20 md:py-28">
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-500 ${heroInView ? "opacity-100" : "opacity-0"}`}>
            Transparency
          </p>
          <h1 className={`mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Every dollar, <span className="italic text-gold">accounted for.</span>
          </h1>
          <p className={`mt-5 max-w-2xl text-base text-primary-foreground/90 md:text-lg transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Independent audits, public filings, and quarterly impact reports.
            We publish what we spend and what it accomplishes.
          </p>

          {/* Quick stats */}
          <div className={`mt-10 flex flex-wrap gap-6 transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { val: "94¢", label: "Per dollar to programs" },
              { val: "★★★★", label: "Charity Navigator" },
              { val: "100%", label: "Publicly audited" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 backdrop-blur">
                <p className="font-serif text-xl font-semibold text-gold">{s.val}</p>
                <p className="text-xs text-primary-foreground/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Allocation */}
      <section ref={allocRef as React.RefObject<HTMLElement>} aria-labelledby="allocation-heading" className="bg-background">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:items-center md:py-28">
          <div className={`transition-all duration-700 ${allocInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How we use your funds</p>
            <h2 id="allocation-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              94¢ of every dollar goes to programs.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Verified annually by an independent auditor. The remaining 6¢ keeps the lights on,
              processes your gift securely, and reaches more donors who want to give well.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Top 5% of nonprofits for program efficiency
            </div>
          </div>
          <div className={`rounded-2xl border border-border bg-card p-6 shadow-card md:p-8 transition-all duration-700 delay-200 ${allocInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <ul className="space-y-6">
              {allocation.map((a, i) => (
                <AllocationBar key={a.label} a={a} index={i} visible={allocInView} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section ref={reportsRef as React.RefObject<HTMLElement>} aria-labelledby="reports-heading" className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <div className={`max-w-2xl transition-all duration-700 ${reportsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Financial reports</p>
            <h2 id="reports-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Audits, 990s, and impact reports.
            </h2>
            <p className="mt-4 text-muted-foreground">Download any document. No account required.</p>
          </div>
          <ul className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            {reports.map((r, i) => {
              const Icon = r.icon;
              return (
                <li
                  key={`${r.year}-${r.title}`}
                  className={`flex items-center gap-4 p-5 transition-all duration-500 hover:bg-surface ${reportsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl shadow-sm ${r.color}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-base font-semibold text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.year} · PDF · {r.size}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:scale-[1.03]"
                    aria-label={`Download ${r.year} ${r.title}`}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Policies */}
      <section ref={policiesRef as React.RefObject<HTMLElement>} aria-labelledby="policies-heading" className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className={`max-w-2xl transition-all duration-700 ${policiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Policies</p>
            <h2 id="policies-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Privacy, security & governance.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {policies.map(({ Icon, color, title, body }, i) => (
              <article
                key={title}
                className={`rounded-2xl border border-border bg-card p-6 shadow-card card-hover-glow transition-all duration-700 ${policiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-xl shadow-md ${color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
