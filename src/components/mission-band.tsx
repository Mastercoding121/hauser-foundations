import { useInView } from "@/hooks/use-in-view";
import { BookOpen, Heart, BarChart3 } from "lucide-react";

const pillars = [
  { icon: BookOpen, label: "Education", color: "icon-blue" },
  { icon: Heart, label: "Health", color: "icon-rose" },
  { icon: BarChart3, label: "Transparency", color: "icon-emerald" },
];

export function MissionBand() {
  const [ref, inView] = useInView(0.2);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} aria-labelledby="mission-heading" className="relative overflow-hidden bg-background">
      {/* Subtle decorative gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,oklch(0.95_0.02_160/0.4),transparent)]" />

      <div className="container-page py-20 md:py-28">
        {/* Pillar icons */}
        <div className={`flex justify-center gap-6 mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {pillars.map(({ icon: Icon, label, color }, i) => (
            <div key={label} className="flex flex-col items-center gap-2" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className={`grid h-12 w-12 place-items-center rounded-2xl shadow-md ${color}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>
            Our mission
          </p>
          <h2
            id="mission-heading"
            className={`mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            We believe every person deserves the dignity of{" "}
            <em className="gradient-text not-italic">opportunity</em> — and that giving should be
            transparent, locally led, and measured by outcomes, not promises.
          </h2>

          <div className={`mt-10 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {["Locally led", "Fully audited", "Impact measured", "Publicly reported"].map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
