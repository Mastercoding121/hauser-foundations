import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; label: string; sublabel: string };

const stats: Stat[] = [
  { value: 1.2, suffix: "M+", label: "Lives reached", sublabel: "across 32 countries" },
  { value: 94, suffix: "¢", label: "Per dollar to programs", sublabel: "audited annually" },
  { value: 240, suffix: "+", label: "Community partners", sublabel: "led by locals" },
  { value: 27, suffix: " yrs", label: "Of measurable impact", sublabel: "since 1998" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
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

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const n = useCountUp(stat.value, start);
  const display = stat.value < 10 ? n.toFixed(1) : Math.round(n).toLocaleString();
  return (
    <div className="border-t border-border pt-6">
      <p className="font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {display}
        <span className="text-gold">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">{stat.label}</p>
      <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
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
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section aria-labelledby="impact-heading" className="bg-background">
      <div ref={ref} className="container-page py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Our impact</p>
            <h2 id="impact-heading" className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Real change, measured and reported.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              We publish every metric, every audit, every grant. Because trust is
              built one line item at a time.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} start={visible} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
