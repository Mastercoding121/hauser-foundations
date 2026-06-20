import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useInView } from "@/hooks/use-in-view";
import { ArrowRight, BookOpen, Heart, Leaf, Quote, MapPin, Sparkles } from "lucide-react";
import education from "@/assets/program-education.jpg";
import health from "@/assets/program-health.jpg";
import climate from "@/assets/program-climate.jpg";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Impact Stories — Hauser Foundation" },
      { name: "description", content: "Real stories of change from the communities the Hauser Foundation serves." },
      { property: "og:title", content: "Impact Stories — Hauser Foundation" },
      { property: "og:description", content: "Meet the people behind the numbers. Stories of education, health, and resilience from 32 countries." },
    ],
  }),
  component: StoriesPage,
});

const featured = {
  img: education,
  name: "Amina Wanjiku",
  location: "Nairobi, Kenya",
  program: "Bright Futures Education",
  programColor: "icon-blue",
  tagBg: "bg-blue-100",
  tagText: "text-blue-700",
  Icon: BookOpen,
  quote: "The scholarship didn't just pay for school — it gave me the freedom to become an engineer. Now I'm building clean-water systems for the same communities that raised me.",
  body: "Amina was 14 when the Hauser Foundation's scholarship program reached her rural school. Today, at 26, she holds a civil engineering degree and leads infrastructure projects across three East African countries. Her story is one of 48,000 we're proud to tell.",
  gradientFrom: "from-blue-600",
  gradientTo: "to-indigo-700",
};

type Story = {
  img: string;
  portrait: string;
  name: string;
  location: string;
  program: string;
  programColor: string;
  tagBg: string;
  tagText: string;
  Icon: typeof BookOpen;
  quote: string;
  body: string;
  stat: string;
  statLabel: string;
  gradientFrom: string;
  gradientTo: string;
};

const stories: Story[] = [
  {
    img: health,
    portrait: leader2,
    name: "Carlos Mendez",
    location: "Oaxaca, Mexico",
    program: "Healthy Communities Initiative",
    programColor: "icon-rose",
    tagBg: "bg-rose-100",
    tagText: "text-rose-700",
    Icon: Heart,
    quote: "The mobile clinic saved my daughter's life. There was no hospital for 200 km — but the clinic was there.",
    body: "Carlos's daughter was born prematurely in a remote mountain village. The Hauser mobile clinic team arrived within hours and provided critical neonatal care. She is now 4 years old and thriving.",
    stat: "320k+",
    statLabel: "Patients served",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
  },
  {
    img: climate,
    portrait: leader3,
    name: "Priya Subramaniam",
    location: "Tamil Nadu, India",
    program: "Climate-Resilient Livelihoods",
    programColor: "icon-emerald",
    tagBg: "bg-emerald-100",
    tagText: "text-emerald-700",
    Icon: Leaf,
    quote: "My co-op went from surviving one drought to planning three harvests ahead. We're not just farmers — we're climate scientists now.",
    body: "Priya co-founded a women's agricultural cooperative with microgrant funding from Hauser. Her group of 40 women now uses climate data to plan drought-resistant crops, tripling their annual income in three years.",
    stat: "180",
    statLabel: "Women-led co-ops",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
  },
  {
    img: education,
    portrait: leader1,
    name: "Jean-Paul Irakoze",
    location: "Kigali, Rwanda",
    program: "Bright Futures Education",
    programColor: "icon-violet",
    tagBg: "bg-violet-100",
    tagText: "text-violet-700",
    Icon: BookOpen,
    quote: "Books, a mentor, and someone who believed I could — that's all it took to change everything.",
    body: "Jean-Paul grew up in a family of subsistence farmers. A Hauser scholarship sent him to secondary school and then university. He now teaches computer science at Rwanda's top public university and mentors the next generation of scholars in the same program that changed his life.",
    stat: "94%",
    statLabel: "Graduation rate",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
  },
];

const milestones = [
  { year: "2022", text: "Amina builds clean-water systems in Kenya", color: "bg-blue-500" },
  { year: "2023", text: "Carlos's daughter survives thanks to mobile clinic", color: "bg-rose-500" },
  { year: "2024", text: "Priya's co-op triples income with climate-resilient crops", color: "bg-emerald-500" },
  { year: "2025", text: "Jean-Paul teaches 200 students the skills that changed his life", color: "bg-violet-500" },
];

function StoryCard({ story, index }: { story: Story; index: number }) {
  const [ref, inView] = useInView(0.1);
  const Icon = story.Icon;

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-700 hover:-translate-y-2 hover:shadow-elegant ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={story.img}
          alt={`${story.program} in ${story.location}`}
          width={1280}
          height={720}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${story.gradientFrom} ${story.gradientTo} opacity-50`} />
        {/* Location badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {story.location}
        </div>
        {/* Program badge */}
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full ${story.tagBg} ${story.tagText} px-2.5 py-1 text-xs font-semibold`}>
          <Icon className="h-3 w-3" aria-hidden="true" />
          {story.program}
        </span>
      </div>

      <div className="p-6">
        {/* Portrait + name */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={story.portrait}
            alt={`Portrait of ${story.name}`}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover border-2 border-border shadow-sm"
          />
          <div>
            <p className="font-semibold text-foreground text-sm">{story.name}</p>
            <p className="text-xs text-muted-foreground">{story.location}</p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="relative">
          <Quote className="absolute -top-1 -left-1 h-5 w-5 text-border" aria-hidden="true" />
          <p className="pl-5 font-serif text-base italic leading-relaxed text-foreground">
            "{story.quote}"
          </p>
        </blockquote>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{story.body}</p>

        {/* Stat */}
        <div className={`mt-4 inline-flex items-baseline gap-1.5 rounded-full bg-gradient-to-r ${story.gradientFrom} ${story.gradientTo} px-3 py-1 text-white`}>
          <span className="font-serif text-base font-semibold">{story.stat}</span>
          <span className="text-xs opacity-90">{story.statLabel}</span>
        </div>
      </div>
    </article>
  );
}

function StoriesPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [milestonesRef, milestonesInView] = useInView(0.1);

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className="relative overflow-hidden bg-primary text-primary-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary-foreground/5 blur-2xl animate-float-slow" />
        <div className="container-page py-20 md:py-28">
          <div className={`max-w-3xl transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground/90 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span className="uppercase tracking-wider">Impact stories</span>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Meet the people <span className="italic text-gold">behind the numbers.</span>
            </h1>
            <p className="mt-5 text-base text-primary-foreground/85 md:text-lg max-w-2xl">
              Every statistic we publish is a person. Here are some of the stories behind
              our programs — told in the voices of the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section aria-labelledby="featured-heading" className="bg-background">
        <div className="container-page py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-3">Featured story</p>
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className="group overflow-hidden rounded-2xl border border-border shadow-card">
              <div className="relative overflow-hidden">
                <img
                  src={featured.img}
                  alt={`${featured.program} — ${featured.name}`}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradientFrom} ${featured.gradientTo} opacity-30`} />
                <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full ${featured.tagBg} ${featured.tagText} px-3 py-1.5 text-xs font-semibold shadow-sm`}>
                  <featured.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {featured.program}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                <span className="text-sm font-medium text-muted-foreground">{featured.location}</span>
              </div>
              <h2 id="featured-heading" className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {featured.name}
              </h2>
              <blockquote className="mt-5 relative">
                <span aria-hidden="true" className="absolute -top-3 -left-2 font-serif text-6xl text-gold/30 leading-none select-none">"</span>
                <p className="pl-4 font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
                  {featured.quote}
                </p>
              </blockquote>
              <p className="mt-4 text-muted-foreground leading-relaxed">{featured.body}</p>
              <Link
                to="/programs"
                className={`mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${featured.gradientFrom} ${featured.gradientTo} px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.03] hover:shadow-lg`}
              >
                See the {featured.program} program
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story cards */}
      <section aria-labelledby="more-stories-heading" className="bg-surface">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">More stories</p>
            <h2 id="more-stories-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Change, across every program.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three programs, three continents, countless lives. Browse a selection of stories from our community partners.
            </p>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {stories.map((s, i) => (
              <StoryCard key={s.name} story={s} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* Milestones timeline */}
      <section ref={milestonesRef as React.RefObject<HTMLElement>} aria-labelledby="milestones-heading" className="bg-background">
        <div className="container-page py-20 md:py-28">
          <div className={`max-w-2xl mb-12 transition-all duration-700 ${milestonesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Recent milestones</p>
            <h2 id="milestones-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Moments that matter.
            </h2>
          </div>
          <ol className="space-y-5 border-l-2 border-border pl-6">
            {milestones.map((m, i) => (
              <li
                key={m.year + m.text}
                className={`relative transition-all duration-700 ${milestonesInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span aria-hidden="true" className={`absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full ${m.color} ring-4 ring-background shadow-md`} />
                <p className="font-serif text-sm font-semibold tracking-wider text-gold">{m.year}</p>
                <p className="mt-0.5 text-base font-medium text-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,_oklch(0.5_0.1_160/0.3),_transparent_60%)]" />
        <div className="container-page py-16 md:py-20 text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Add your story to ours.
          </h2>
          <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto">
            Every donation funds programs that create stories like these. Join 12,000+ donors who give with transparency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/donate"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3 text-base font-semibold text-gold-foreground shadow-md transition-all hover:scale-[1.03] hover:shadow-lg"
            >
              Donate now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex min-h-12 items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/8 px-7 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/18"
            >
              Explore programs
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
