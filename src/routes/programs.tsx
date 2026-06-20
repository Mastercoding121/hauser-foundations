import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useInView } from "@/hooks/use-in-view";
import { ArrowRight, Users, Target, TrendingUp, BookOpen, Heart, Leaf, MapPin } from "lucide-react";
import education from "@/assets/program-education.jpg";
import health from "@/assets/program-health.jpg";
import climate from "@/assets/program-climate.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Our Programs — Hauser Foundation" },
      { name: "description", content: "Explore Hauser Foundation initiatives in education, health, and climate-resilient livelihoods." },
    ],
  }),
  component: ProgramsPage,
});

type Program = {
  image: string;
  tag: string;
  tagBg: string;
  tagText: string;
  gradientFrom: string;
  gradientTo: string;
  Icon: typeof BookOpen;
  iconClass: string;
  title: string;
  region: string;
  body: string;
  stats: { label: string; value: string; color: string }[];
};

const programs: Program[] = [
  {
    image: education,
    tag: "Education",
    tagBg: "bg-blue-100",
    tagText: "text-blue-700",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    Icon: BookOpen,
    iconClass: "icon-blue",
    title: "Bright Futures Education",
    region: "East Africa · South Asia",
    body: "We fund scholarships, train teachers, and supply learning materials to 120 schools across nine countries — giving every student a fair start.",
    stats: [
      { label: "Students supported", value: "48,000", color: "text-blue-600" },
      { label: "Schools partnered", value: "120", color: "text-indigo-600" },
      { label: "Graduation rate", value: "94%", color: "text-violet-600" },
    ],
  },
  {
    image: health,
    tag: "Health",
    tagBg: "bg-rose-100",
    tagText: "text-rose-700",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    Icon: Heart,
    iconClass: "icon-rose",
    title: "Healthy Communities Initiative",
    region: "Latin America · West Africa",
    body: "Mobile clinics, maternal-care programs, and vaccination drives reaching last-mile communities with the primary care they deserve.",
    stats: [
      { label: "Patients treated", value: "320k+", color: "text-rose-600" },
      { label: "Mobile clinics", value: "42", color: "text-pink-600" },
      { label: "Local health workers", value: "880", color: "text-red-600" },
    ],
  },
  {
    image: climate,
    tag: "Livelihoods",
    tagBg: "bg-emerald-100",
    tagText: "text-emerald-700",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    Icon: Leaf,
    iconClass: "icon-emerald",
    title: "Climate-Resilient Livelihoods",
    region: "Global",
    body: "Microgrants, training, and sustainable agriculture for smallholder farmers — with women-led co-ops at the center of every project.",
    stats: [
      { label: "Farmers trained", value: "21,500", color: "text-emerald-600" },
      { label: "Women-led co-ops", value: "180", color: "text-teal-600" },
      { label: "Hectares restored", value: "12k", color: "text-green-600" },
    ],
  },
];

function ProgramArticle({ p, index }: { p: Program; index: number }) {
  const [ref, inView] = useInView(0.1);
  const isOdd = index % 2 === 1;

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${isOdd ? "md:[&>div:first-child]:order-2" : ""}`}
    >
      <div className={`overflow-hidden rounded-2xl border border-border bg-muted shadow-card group transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
           style={{ transitionDelay: "100ms" }}>
        <div className="relative overflow-hidden">
          <img
            src={p.image}
            alt={`${p.title} program in ${p.region}`}
            width={1280}
            height={896}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          {/* Overlay gradient on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t ${p.gradientFrom} ${p.gradientTo} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
          {/* Icon badge */}
          <span className={`absolute top-4 left-4 flex items-center gap-2 rounded-full ${p.tagBg} ${p.tagText} px-3 py-1.5 text-xs font-semibold shadow-sm`}>
            <p.Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {p.tag}
          </span>
        </div>
      </div>

      <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : isOdd ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6"}`}>
        <div className="flex items-center gap-2">
          <span className={`grid h-8 w-8 place-items-center rounded-lg ${p.iconClass}`}>
            <p.Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className={`text-xs font-semibold uppercase tracking-wider ${p.tagText}`}>{p.tag}</span>
        </div>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {p.title}
        </h2>
        <p className="mt-1 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {p.region}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.body}</p>
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
          {p.stats.map((s, i) => (
            <div key={s.label} className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${400 + i * 80}ms` }}>
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className={`mt-1 font-serif text-xl font-semibold md:text-2xl ${s.color}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          to="/donate"
          className={`mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r ${p.gradientFrom} ${p.gradientTo} px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.03] hover:shadow-lg`}
        >
          Fund this program
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function ProgramsPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [howRef, howInView] = useInView(0.1);

  const howSteps = [
    { Icon: Users, title: "Listen", body: "We partner with community-led organizations who know the work best.", color: "icon-violet", num: "01" },
    { Icon: Target, title: "Fund", body: "Multi-year grants with clear outcomes and shared decision-making.", color: "icon-amber", num: "02" },
    { Icon: TrendingUp, title: "Measure", body: "Every program reports outcomes publicly, every quarter.", color: "icon-sky", num: "03" },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className="relative overflow-hidden bg-surface">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container-page grid gap-10 py-20 md:grid-cols-[1.1fr_1fr] md:items-end md:py-28">
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Programs</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Local leaders.<br />
              <span className="italic text-primary">Lasting outcomes.</span>
            </h1>
          </div>
          <p className={`text-base text-muted-foreground md:text-lg transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Every Hauser program is designed with the people it serves — and
            measured by the change it creates. Browse our active initiatives below.
          </p>
        </div>
      </section>

      {/* Program list */}
      <section aria-label="Our programs" className="bg-background">
        <div className="container-page space-y-24 py-20 md:space-y-32 md:py-28">
          {programs.map((p, i) => (
            <ProgramArticle key={p.title} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* How we work */}
      <section ref={howRef as React.RefObject<HTMLElement>} aria-labelledby="how-heading" className="relative overflow-hidden bg-surface">
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="container-page py-20 md:py-28">
          <div className={`max-w-2xl transition-all duration-700 ${howInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How we work</p>
            <h2 id="how-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              A simple, accountable cycle.
            </h2>
            <p className="mt-4 text-muted-foreground">Built on 27 years of learning what actually creates lasting change.</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {howSteps.map(({ Icon, title, body, color, num }, i) => (
              <li
                key={title}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card card-hover-glow transition-all duration-700 ${howInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Large number watermark */}
                <span aria-hidden="true" className="absolute -right-2 -top-4 font-serif text-8xl font-bold text-border select-none">
                  {num}
                </span>
                <span className={`relative grid h-12 w-12 place-items-center rounded-xl shadow-md ${color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="relative mt-5 font-serif text-sm font-semibold uppercase tracking-wider text-gold">Step {num}</p>
                <h3 className="relative mt-1 font-serif text-xl font-semibold text-foreground">{title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageLayout>
  );
}
