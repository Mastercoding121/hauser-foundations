import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { ArrowRight, Users, Target, TrendingUp } from "lucide-react";
import education from "@/assets/program-education.jpg";
import health from "@/assets/program-health.jpg";
import climate from "@/assets/program-climate.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Our Programs — Hauser Foundation" },
      { name: "description", content: "Explore Hauser Foundation initiatives in education, health, and climate-resilient livelihoods." },
      { property: "og:title", content: "Our Programs — Hauser Foundation" },
      { property: "og:description", content: "Education, health, and climate programs with measurable, transparent outcomes." },
    ],
  }),
  component: ProgramsPage,
});

type Program = {
  image: string;
  tag: string;
  title: string;
  region: string;
  body: string;
  stats: { label: string; value: string }[];
};

const programs: Program[] = [
  {
    image: education,
    tag: "Education",
    title: "Bright Futures Education",
    region: "East Africa · South Asia",
    body: "We fund scholarships, train teachers, and supply learning materials to 120 schools across nine countries — giving every student a fair start.",
    stats: [
      { label: "Students supported", value: "48,000" },
      { label: "Schools partnered", value: "120" },
      { label: "Graduation rate", value: "94%" },
    ],
  },
  {
    image: health,
    tag: "Health",
    title: "Healthy Communities Initiative",
    region: "Latin America · West Africa",
    body: "Mobile clinics, maternal-care programs, and vaccination drives reaching last-mile communities with the primary care they deserve.",
    stats: [
      { label: "Patients treated", value: "320k+" },
      { label: "Mobile clinics", value: "42" },
      { label: "Local health workers", value: "880" },
    ],
  },
  {
    image: climate,
    tag: "Livelihoods",
    title: "Climate-Resilient Livelihoods",
    region: "Global",
    body: "Microgrants, training, and sustainable agriculture for smallholder farmers — with women-led co-ops at the center of every project.",
    stats: [
      { label: "Farmers trained", value: "21,500" },
      { label: "Women-led co-ops", value: "180" },
      { label: "Hectares restored", value: "12k" },
    ],
  },
];

function ProgramsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[1.1fr_1fr] md:items-end md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Programs</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Local leaders.<br />
              <span className="italic text-primary">Lasting outcomes.</span>
            </h1>
          </div>
          <p className="text-base text-muted-foreground md:text-lg">
            Every Hauser program is designed with the people it serves — and
            measured by the change it creates. Browse our active initiatives below.
          </p>
        </div>
      </section>

      {/* Program list */}
      <section aria-label="Our programs" className="bg-background">
        <div className="container-page space-y-20 py-20 md:space-y-28 md:py-28">
          {programs.map((p, i) => (
            <article
              key={p.title}
              className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-16 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-card">
                <img
                  src={p.image}
                  alt={`${p.title} program in ${p.region}`}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div>
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  {p.tag}
                </span>
                <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.region}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.body}</p>
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-xs text-muted-foreground">{s.label}</dt>
                      <dd className="mt-1 font-serif text-xl font-semibold text-foreground md:text-2xl">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  to="/donate"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Fund this program
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="how-heading" className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How we work</p>
            <h2 id="how-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              A simple, accountable cycle.
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Users, title: "Listen", body: "We partner with community-led organizations who know the work best." },
              { Icon: Target, title: "Fund", body: "Multi-year grants with clear outcomes and shared decision-making." },
              { Icon: TrendingUp, title: "Measure", body: "Every program reports outcomes publicly, every quarter." },
            ].map(({ Icon, title, body }, i) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-serif text-sm font-semibold uppercase tracking-wider text-gold">Step 0{i + 1}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageLayout>
  );
}
