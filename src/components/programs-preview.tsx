import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Heart, Leaf } from "lucide-react";
import education from "@/assets/program-education.jpg";
import health from "@/assets/program-health.jpg";
import climate from "@/assets/program-climate.jpg";
import { useInView } from "@/hooks/use-in-view";

const programs = [
  {
    img: education,
    tag: "Education",
    tagColor: "bg-blue-100 text-blue-700",
    accentColor: "from-blue-500 to-indigo-600",
    Icon: BookOpen,
    iconClass: "icon-blue",
    title: "Bright Futures Education",
    region: "East Africa · South Asia",
    body: "Scholarships, teacher training, and learning materials for 48,000 students across 120 schools.",
    stat: "48,000 students",
  },
  {
    img: health,
    tag: "Health",
    tagColor: "bg-rose-100 text-rose-700",
    accentColor: "from-rose-500 to-pink-600",
    Icon: Heart,
    iconClass: "icon-rose",
    title: "Healthy Communities Initiative",
    region: "Latin America · West Africa",
    body: "Mobile clinics and maternal-health programs delivering primary care in underserved regions.",
    stat: "320k+ patients",
  },
  {
    img: climate,
    tag: "Livelihoods",
    tagColor: "bg-emerald-100 text-emerald-700",
    accentColor: "from-emerald-500 to-teal-600",
    Icon: Leaf,
    iconClass: "icon-emerald",
    title: "Climate-Resilient Livelihoods",
    region: "Global",
    body: "Microgrants, training, and sustainable agriculture for smallholder farmers and women-led co-ops.",
    stat: "21,500 farmers",
  },
];

export function ProgramsPreview() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} aria-labelledby="programs-heading" className="bg-background">
      <div className="container-page py-20 md:py-28">
        <div className={`flex flex-col items-start justify-between gap-6 md:flex-row md:items-end transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Ongoing programs</p>
            <h2 id="programs-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Where your support goes to work.
            </h2>
          </div>
          <Link
            to="/programs"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:scale-[1.02]"
          >
            View all programs
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {programs.map((p, i) => (
            <li
              key={p.title}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-700 hover:-translate-y-2 hover:shadow-elegant ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 130}ms` }}
            >
              {/* Image with gradient overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={`${p.title} program in ${p.region}`}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Colorful icon badge */}
                <span className={`absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-xl shadow-lg ${p.iconClass} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                  <p.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className={`inline-block self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${p.tagColor}`}>
                  {p.tag}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.region}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>

                {/* Stat chip */}
                <div className={`mt-4 inline-flex self-start items-center gap-1.5 rounded-full bg-gradient-to-r ${p.accentColor} px-3 py-1 text-xs font-semibold text-white shadow-sm`}>
                  {p.stat}
                </div>

                <Link
                  to="/programs"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  aria-label={`Learn more about ${p.title}`}
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Bottom accent bar */}
              <div className={`h-0.5 w-full bg-gradient-to-r ${p.accentColor} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
