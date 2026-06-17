import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
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
      { property: "og:title", content: "About the Hauser Foundation" },
      { property: "og:description", content: "Meet the leaders and learn the history behind a 501(c)(3) committed to transparent giving." },
    ],
  }),
  component: AboutPage,
});

const leaders = [
  { img: leader1, name: "Dr. Amara Okonkwo", role: "Executive Director", bio: "Public-health physician with 22 years leading community-health programs across sub-Saharan Africa." },
  { img: leader2, name: "Rajiv Mehta", role: "Board Chair", bio: "Former CFO of Global Outreach; champions financial transparency and long-term grantmaking." },
  { img: leader3, name: "Sofia Reyes", role: "Director of Programs", bio: "Two decades designing and evaluating education and climate programs in Latin America." },
  { img: leader4, name: "Mark Lindgren", role: "Treasurer", bio: "Independent auditor and nonprofit financial advisor based in Stockholm." },
];

const timeline = [
  { year: "1998", title: "Founded", body: "Hauser Foundation is established with a single scholarship program in Kenya." },
  { year: "2006", title: "First clinic", body: "Our first community health partnership launches in rural Guatemala." },
  { year: "2014", title: "Global expansion", body: "We grow to 18 countries with locally-led teams in every region." },
  { year: "2020", title: "Resilience response", body: "Emergency grantmaking to 240 partners during the pandemic." },
  { year: "2025", title: "Today", body: "1.2M+ lives reached annually with 94¢ of every dollar going to programs." },
];

function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[1.1fr_1fr] md:items-end md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">About us</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Twenty-seven years of <span className="italic text-gold">partnership.</span>
            </h1>
          </div>
          <p className="text-base text-primary-foreground/85 md:text-lg">
            We were founded on a simple idea: when communities lead, change lasts.
            That principle still guides every grant, every program, and every report we publish.
          </p>
        </div>
      </section>

      {/* History */}
      <section aria-labelledby="history-heading" className="bg-background">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={historyImg}
              alt="Community volunteers building a school together at golden hour"
              width={1600}
              height={1024}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
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
            <ol className="mt-8 space-y-5 border-l border-border pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
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
            {leaders.map((l) => (
              <li key={l.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <img
                  src={l.img}
                  alt={`Portrait of ${l.name}, ${l.role}`}
                  width={800}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{l.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">{l.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{l.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
