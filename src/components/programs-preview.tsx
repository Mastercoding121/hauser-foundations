import { Link } from "@tanstack/react-router";
import { BookOpen, HeartPulse, Sprout, ArrowUpRight } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "Bright Futures Education",
    region: "East Africa · South Asia",
    body: "Scholarships, teacher training, and learning materials for 48,000 students across 120 schools.",
  },
  {
    icon: HeartPulse,
    title: "Healthy Communities Initiative",
    region: "Latin America · West Africa",
    body: "Mobile clinics and maternal-health programs delivering primary care in underserved regions.",
  },
  {
    icon: Sprout,
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
          {programs.map(({ icon: Icon, title, region, body }) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{region}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <Link
                to="/programs"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                aria-label={`Learn more about ${title}`}
              >
                Learn more
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
