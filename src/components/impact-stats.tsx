import { useEffect, useRef, useState } from "react";
import { Globe, TrendingUp, Users, Clock } from "lucide-react";

type Stat = { value: number; suffix?: string; label: string; sublabel: string; icon: typeof Globe; color: string };

const stats: Stat[] = [
  { value: 1.2, suffix: "M+", label: "Lives reached", sublabel: "across 32 countries", icon: Globe, color: "icon-blue" },
  { value: 94, suffix: "¢", label: "Per dollar to programs", sublabel: "audited annually", icon: TrendingUp, color: "icon-emerald" },
  { value: 240, suffix: "+", label: "Community partners", sublabel: "led by locals", icon: Users, color: "icon-violet" },
  { value: 27, suffix: " yrs", label: "Of measurable impact", sublabel: "since 1998", icon: Clock, color: "icon-amber" },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

function StatCard({ stat, start, index }: { stat: Stat; start: boolean; index: number }) {
  const n = useCountUp(stat.value, start);
  const display = stat.value < 10 ? n.toFixed(1) : Math.round(n).toLocaleString();
  const Icon = stat.icon;

  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-card card-hover-glow transition-all duration-700 ${start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <span className={`grid h-12 w-12 place-items-center rounded-xl shadow-md ${stat.color}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {display}
        <span className="text-gold">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">{stat.label}</p>
      <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
    </div>
  );
}

export function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section aria-labelledby="impact-heading" className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_50%,oklch(0.32_0.06_160/0.06),transparent)]" />
      <div ref={ref} className="container-page py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
            Our impact
          </p>
          <h2
            id="impact-heading"
            className={`mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Real change, measured and reported.
          </h2>
          <p className={`mt-4 text-base text-muted-foreground transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
            We publish every metric, every audit, every grant. Because trust is
            built one line item at a time.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} start={visible} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}
