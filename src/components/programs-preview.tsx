import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import education from "@/assets/program-education.jpg";
import health from "@/assets/program-health.jpg";
import climate from "@/assets/program-climate.jpg";

const programs = [
  {
    img: education,
    tag: "Education",
    title: "Bright Futures Education",
    region: "East Africa · South Asia",
    body: "Scholarships, teacher training, and learning materials for 48,000 students across 120 schools.",
  },
  {
    img: health,
    tag: "Health",
    title: "Healthy Communities Initiative",
    region: "Latin America · West Africa",
    body: "Mobile clinics and maternal-health programs delivering primary care in underserved regions.",
  },
  {
    img: climate,
    tag: "Livelihoods",
    title: "Climate-Resilient Livelihoods",
    region: "Global",
    body: "Microgrants, training, and sustainable agriculture for smallholder farmers and women-led co-ops.",
  },
];

export function ProgramsPreview() {
  return (
    <section aria-labelledby="programs-heading" className="bg-surface">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Ongoing programs</p>
            <h2 id="programs-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Where your support goes to work.
            </h2>
          </div>
          <Link
            to="/programs"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            View all programs
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <li
              key={p.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={`${p.title} program in ${p.region}`}
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block self-start rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.region}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <Link
                  to="/programs"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  aria-label={`Learn more about ${p.title}`}
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
