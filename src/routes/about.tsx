import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useInView } from "@/hooks/use-in-view";
import { Award, Globe, Users, Sparkles } from "lucide-react";
import historyImg from "@/assets/about-history.jpg";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";
import leader4 from "@/assets/leader-4.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hauser Foundation" },
      { name: "description", content: "Our 27-year history, leadership, board of directors, and the values that guide our work." },
    ],
  }),
  component: AboutPage,
});

const leaders = [
  { img: leader1, name: "Dr. Amara Okonkwo", role: "Executive Director", bio: "Public-health physician with 22 years leading community-health programs across sub-Saharan Africa.", color: "icon-blue" },
  { img: leader2, name: "Rajiv Mehta", role: "Board Chair", bio: "Former CFO of Global Outreach; champions financial transparency and long-term grantmaking.", color: "icon-violet" },
  { img: leader3, name: "Sofia Reyes", role: "Director of Programs", bio: "Two decades designing and evaluating education and climate programs in Latin America.", color: "icon-rose" },
  { img: leader4, name: "Mark Lindgren", role: "Treasurer", bio: "Independent auditor and nonprofit financial advisor based in Stockholm.", color: "icon-emerald" },
];

const timeline = [
  { year: "1998", title: "Founded", body: "Hauser Foundation established with a single scholarship program in Kenya.", color: "bg-blue-500" },
  { year: "2006", title: "First clinic", body: "Our first community health partnership launches in rural Guatemala.", color: "bg-rose-500" },
  { year: "2014", title: "Global expansion", body: "We grow to 18 countries with locally-led teams in every region.", color: "bg-violet-500" },
  { year: "2020", title: "Resilience response", body: "Emergency grantmaking to 240 partners during the pandemic.", color: "bg-amber-500" },
  { year: "2025", title: "Today", body: "1.2M+ lives reached annually with 94¢ of every dollar going to programs.", color: "bg-emerald-500" },
];

const values = [
  { icon: Globe, label: "Global reach", desc: "32 countries, locally driven", color: "icon-blue" },
  { icon: Users, label: "Community-first", desc: "Partners lead every program", color: "icon-violet" },
  { icon: Award, label: "Accountability", desc: "4-star Charity Navigator", color: "icon-gold" },
  { icon: Sparkles, label: "Innovation", desc: "Evidence-based, adaptive methods", color: "icon-emerald" },
];

function LeaderCard({ l, index }: { l: typeof leaders[0]; index: number }) {
  const [ref, inView] = useInView(0.1);
  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement>}
      className={`overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-700 hover:-translate-y-2 hover:shadow-elegant group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={l.img}
          alt={`Portrait of ${l.name}, ${l.role}`}
          width={800}
          height={1024}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className={`absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-xl shadow-lg ${l.color} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
          <Users className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground">{l.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{l.role}</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.bio}</p>
      </div>
    </li>
  );
}

function AboutPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [historyRef, historyInView] = useInView(0.1);
  const [valuesRef, valuesInView] = useInView(0.1);

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className="relative overflow-hidden bg-primary text-primary-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary-foreground/5 blur-2xl animate-float-slow" />
        <div className="container-page grid gap-10 py-20 md:grid-cols-[1.1fr_1fr] md:items-end md:py-28">
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">About us</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Twenty-seven years of <span className="italic text-gold">partnership.</span>
            </h1>
          </div>
          <p className={`text-base text-primary-foreground/85 md:text-lg transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            We were founded on a simple idea: when communities lead, change lasts.
            That principle still guides every grant, every program, and every report we publish.
          </p>
        </div>
      </section>

      {/* Values band */}
      <section ref={valuesRef as React.RefObject<HTMLElement>} className="bg-surface border-b border-border">
        <div className="container-page py-10">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {values.map(({ icon: Icon, label, desc, color }, i) => (
              <div
                key={label}
                className={`flex items-center gap-3 transition-all duration-700 ${valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-md ${color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="font-semibold text-sm text-foreground">{label}</dt>
                  <dd className="text-xs text-muted-foreground">{desc}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* History */}
      <section ref={historyRef as React.RefObject<HTMLElement>} aria-labelledby="history-heading" className="bg-background">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className={`overflow-hidden rounded-2xl border border-border shadow-card transition-all duration-700 ${historyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <img
              src={historyImg}
              alt="Community volunteers building a school together at golden hour"
              width={1600}
              height={1024}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div className={`transition-all duration-700 delay-200 ${historyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Our history</p>
            <h2 id="history-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              From one classroom to a global network.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Margaret and Henry Hauser started the Foundation in 1998 to fund a single
              scholarship cohort in western Kenya. Today, we partner with 240 community
              organizations across 32 countries — but the model hasn't changed:
              listen first, fund well, measure honestly.
            </p>
            <ol className="mt-8 space-y-5 border-l-2 border-border pl-6">
              {timeline.map((t, i) => (
                <li
                  key={t.year}
                  className={`relative transition-all duration-500 ${historyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <span aria-hidden="true" className={`absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full ${t.color} ring-4 ring-background shadow-md`} />
                  <p className="font-serif text-sm font-semibold tracking-wider text-gold">{t.year}</p>
                  <p className="mt-0.5 font-serif text-lg font-semibold text-foreground">{t.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leaders-heading" className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Leadership & board</p>
            <h2 id="leaders-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              The people accountable to you.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our staff and board reflect the communities we serve and the standards we uphold.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l, i) => (
              <LeaderCard key={l.name} l={l} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
