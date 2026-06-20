import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useState, useMemo, useRef } from "react";
import {
  Search, Download, X, BookOpen, Heart, Leaf, Globe,
  DollarSign, LayoutList, ChevronUp, ChevronDown, Filter,
} from "lucide-react";

export const Route = createFileRoute("/grants")({
  head: () => ({
    meta: [
      { title: "Grants Database — Hauser Foundation" },
      {
        name: "description",
        content:
          "Browse every grant the Hauser Foundation has disbursed — searchable by grantee, program, country, and year.",
      },
    ],
  }),
  component: GrantsPage,
});

/* ── Data ──────────────────────────────────────────────────────── */

type Program = "Education" | "Health" | "Livelihoods";
type Status = "Active" | "Completed";
type SortKey = "grantee" | "country" | "amount" | "year";
type SortDir = "asc" | "desc";

interface Grant {
  id: number;
  grantee: string;
  program: Program;
  country: string;
  year: number;
  amount: number;
  status: Status;
  description: string;
}

const ALL_GRANTS: Grant[] = [
  { id: 1,  grantee: "Nairobi Learning Trust",          program: "Education",   country: "Kenya",        year: 2025, amount: 180000, status: "Active",    description: "Scholarships and teacher training for 1,200 secondary students." },
  { id: 2,  grantee: "Salud Comunitaria AC",            program: "Health",      country: "Mexico",       year: 2025, amount: 95000,  status: "Active",    description: "Mobile clinic expansion across 14 rural municipalities." },
  { id: 3,  grantee: "Tamil Agri Women's Collective",   program: "Livelihoods", country: "India",        year: 2025, amount: 72000,  status: "Active",    description: "Microgrants and drought-resistant seed distribution." },
  { id: 4,  grantee: "Kampala Youth Academy",           program: "Education",   country: "Uganda",       year: 2025, amount: 145000, status: "Active",    description: "STEM curriculum rollout across 18 public schools." },
  { id: 5,  grantee: "Kigali Health Partners",          program: "Health",      country: "Rwanda",       year: 2025, amount: 120000, status: "Active",    description: "Community health worker training and supply-chain support." },
  { id: 6,  grantee: "Sahel Reforestation Co-op",       program: "Livelihoods", country: "Mali",         year: 2025, amount: 88000,  status: "Active",    description: "Agroforestry micro-grants for 600 smallholder farmers." },
  { id: 7,  grantee: "Dhaka Girls' Education Fund",     program: "Education",   country: "Bangladesh",   year: 2024, amount: 160000, status: "Active",    description: "Girls' secondary completion grants in urban slum schools." },
  { id: 8,  grantee: "Oaxaca Maternal Health Alliance", program: "Health",      country: "Mexico",       year: 2024, amount: 104000, status: "Completed", description: "Maternal-care clinics serving 8,200 women across three states." },
  { id: 9,  grantee: "Guatemala Micro-Farm Network",    program: "Livelihoods", country: "Guatemala",    year: 2024, amount: 63000,  status: "Completed", description: "Cooperative formation support and market-linkage training." },
  { id: 10, grantee: "Lagos Learning Alliance",         program: "Education",   country: "Nigeria",      year: 2024, amount: 175000, status: "Active",    description: "Teacher capacity-building in low-income public schools." },
  { id: 11, grantee: "Kathmandu Clinic Network",        program: "Health",      country: "Nepal",        year: 2024, amount: 87000,  status: "Completed", description: "Post-earthquake primary care restoration across 12 districts." },
  { id: 12, grantee: "Peru Highland Farmers",           program: "Livelihoods", country: "Peru",         year: 2024, amount: 55000,  status: "Completed", description: "Climate-adaptive agriculture training for Andean communities." },
  { id: 13, grantee: "Freetown School Builders",        program: "Education",   country: "Sierra Leone", year: 2024, amount: 130000, status: "Active",    description: "School construction and furniture grants for 22 villages." },
  { id: 14, grantee: "West Bengal Community Clinics",   program: "Health",      country: "India",        year: 2024, amount: 99000,  status: "Active",    description: "Rural clinic staffing and essential medicines supply." },
  { id: 15, grantee: "Mekong Delta Rice Collective",    program: "Livelihoods", country: "Vietnam",      year: 2023, amount: 68000,  status: "Completed", description: "Flood-resilient rice varieties and cooperative storage." },
  { id: 16, grantee: "Accra Teacher Fellows",           program: "Education",   country: "Ghana",        year: 2023, amount: 92000,  status: "Completed", description: "Fellowship stipends for 80 master teachers across Accra." },
  { id: 17, grantee: "Kinshasa Health Access",          program: "Health",      country: "DRC",          year: 2023, amount: 115000, status: "Completed", description: "Vaccination and malaria-prevention program for 40,000 residents." },
  { id: 18, grantee: "Mozambique Coastal Co-op",        program: "Livelihoods", country: "Mozambique",   year: 2023, amount: 79000,  status: "Completed", description: "Fisher cooperative formation and climate resilience training." },
  { id: 19, grantee: "Yangon Youth Skills Center",      program: "Education",   country: "Myanmar",      year: 2023, amount: 108000, status: "Completed", description: "Vocational training and job-placement support for 400 youth." },
  { id: 20, grantee: "Bogotá Mobile Clinics",           program: "Health",      country: "Colombia",     year: 2023, amount: 91000,  status: "Completed", description: "Mobile dental and primary-care clinics for peri-urban families." },
  { id: 21, grantee: "Zambia Smallholder Alliance",     program: "Livelihoods", country: "Zambia",       year: 2023, amount: 84000,  status: "Completed", description: "Seed-bank establishment and drought-preparedness workshops." },
  { id: 22, grantee: "Karachi Girls School Fund",       program: "Education",   country: "Pakistan",     year: 2022, amount: 140000, status: "Completed", description: "Girls' enrollment campaign and infrastructure improvements." },
  { id: 23, grantee: "Addis Women's Health Co-op",      program: "Health",      country: "Ethiopia",     year: 2022, amount: 76000,  status: "Completed", description: "Community-based reproductive and maternal-health outreach." },
  { id: 24, grantee: "Senegal Mango Farmers",           program: "Livelihoods", country: "Senegal",      year: 2022, amount: 58000,  status: "Completed", description: "Post-harvest storage, processing, and export-market access." },
  { id: 25, grantee: "Hanoi Community Schools",         program: "Education",   country: "Vietnam",      year: 2022, amount: 110000, status: "Completed", description: "Inclusive-education materials and disability-access retrofits." },
  { id: 26, grantee: "Dar es Salaam Primary Care",      program: "Health",      country: "Tanzania",     year: 2022, amount: 83000,  status: "Completed", description: "Clinic renovations and staff training in three districts." },
  { id: 27, grantee: "Bolivia Women Weavers Co-op",     program: "Livelihoods", country: "Bolivia",      year: 2022, amount: 47000,  status: "Completed", description: "Artisan cooperative, digital marketplace, and export support." },
];

/* ── Helpers ───────────────────────────────────────────────────── */

const PROGRAM_META: Record<Program, { Icon: typeof BookOpen; iconClass: string; tagBg: string; tagText: string }> = {
  Education:   { Icon: BookOpen, iconClass: "icon-blue",    tagBg: "bg-blue-100",    tagText: "text-blue-700" },
  Health:      { Icon: Heart,    iconClass: "icon-rose",    tagBg: "bg-rose-100",    tagText: "text-rose-700" },
  Livelihoods: { Icon: Leaf,     iconClass: "icon-emerald", tagBg: "bg-emerald-100", tagText: "text-emerald-700" },
};

const fmt = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : `$${(n / 1000).toFixed(0)}k`;

const fmtFull = (n: number) =>
  "$" + n.toLocaleString("en-US");

function exportCsv(rows: Grant[]) {
  const header = ["ID", "Grantee", "Program", "Country", "Year", "Amount (USD)", "Status", "Description"];
  const lines = rows.map((g) =>
    [g.id, `"${g.grantee}"`, g.program, g.country, g.year, g.amount, g.status, `"${g.description}"`].join(",")
  );
  const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hauser-foundation-grants.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Sub-components ─────────────────────────────────────────────── */

function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
        active
          ? color ?? "border-primary bg-primary text-primary-foreground shadow-sm scale-[1.04]"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:scale-[1.02]"
      }`}
    >
      {label}
    </button>
  );
}

function SortButton({
  col,
  label,
  active,
  dir,
  onClick,
}: {
  col: SortKey;
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: (col: SortKey) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(col)}
      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
      aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
    >
      {label}
      <span aria-hidden="true" className="inline-flex flex-col">
        <ChevronUp className={`h-2.5 w-2.5 ${active && dir === "asc" ? "text-primary" : "text-border"}`} />
        <ChevronDown className={`h-2.5 w-2.5 -mt-0.5 ${active && dir === "desc" ? "text-primary" : "text-border"}`} />
      </span>
    </button>
  );
}

/* ── Main page ──────────────────────────────────────────────────── */

function GrantsPage() {
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState<Program | "All">("All");
  const [year, setYear] = useState<number | "All">("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const inputRef = useRef<HTMLInputElement>(null);

  const years = useMemo(
    () => [...new Set(ALL_GRANTS.map((g) => g.year))].sort((a, b) => b - a),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_GRANTS.filter((g) => {
      if (program !== "All" && g.program !== program) return false;
      if (year !== "All" && g.year !== year) return false;
      if (status !== "All" && g.status !== status) return false;
      if (q && !g.grantee.toLowerCase().includes(q) && !g.country.toLowerCase().includes(q) && !g.program.toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "amount") return (a.amount - b.amount) * mul;
      if (sortKey === "year")   return (a.year - b.year) * mul;
      return a[sortKey].localeCompare(b[sortKey]) * mul;
    });
  }, [query, program, year, status, sortKey, sortDir]);

  const totalDisbursed = filtered.reduce((s, g) => s + g.amount, 0);
  const countries = new Set(filtered.map((g) => g.country)).size;
  const allTotal   = ALL_GRANTS.reduce((s, g) => s + g.amount, 0);

  const toggleSort = (col: SortKey) => {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("desc"); }
  };

  const clearFilters = () => {
    setQuery("");
    setProgram("All");
    setYear("All");
    setStatus("All");
    inputRef.current?.focus();
  };

  const hasFilters = query || program !== "All" || year !== "All" || status !== "All";

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-primary-foreground/5 blur-2xl animate-float-slow" />
        <div className="container-page py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold animate-fade-in">Grants database</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl animate-fade-up delay-100">
            Every grant,{" "}
            <span className="italic text-gold">open to the public.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg animate-fade-up delay-200">
            Search and filter every disbursement the Hauser Foundation has made since 2022.
            Download the full dataset as CSV — no login required.
          </p>

          {/* Summary stats */}
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
            {[
              { Icon: DollarSign, color: "icon-gold",    val: fmt(allTotal),          label: "Total disbursed (all time)" },
              { Icon: LayoutList, color: "icon-blue",    val: ALL_GRANTS.length + "",  label: "Total grants" },
              { Icon: Globe,      color: "icon-emerald", val: new Set(ALL_GRANTS.map((g) => g.country)).size + "", label: "Countries reached" },
            ].map(({ Icon, color, val, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 backdrop-blur">
                <span className={`grid h-9 w-9 place-items-center rounded-lg ${color}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-xl font-semibold text-gold">{val}</p>
                  <p className="text-xs text-primary-foreground/70">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls + table */}
      <section aria-labelledby="grants-heading" className="bg-background">
        <div className="container-page py-12 md:py-16">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-card md:p-6">
            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                aria-label="Search grants"
                placeholder="Search by grantee, country, or program…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-input bg-background pl-10 pr-10 py-2.5 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Filter rows */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                Program
              </span>
              {(["All", "Education", "Health", "Livelihoods"] as const).map((p) => {
                const meta = p !== "All" ? PROGRAM_META[p] : null;
                return (
                  <FilterChip
                    key={p}
                    label={p === "All" ? "All programs" : p}
                    active={program === p}
                    onClick={() => setProgram(p)}
                    color={
                      p === "Education"   ? "border-blue-400 bg-blue-500 text-white shadow-sm scale-[1.04]" :
                      p === "Health"      ? "border-rose-400 bg-rose-500 text-white shadow-sm scale-[1.04]" :
                      p === "Livelihoods" ? "border-emerald-400 bg-emerald-500 text-white shadow-sm scale-[1.04]" :
                      undefined
                    }
                  />
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Year</span>
              <FilterChip label="All years" active={year === "All"} onClick={() => setYear("All")} />
              {years.map((y) => (
                <FilterChip key={y} label={String(y)} active={year === y} onClick={() => setYear(y)} />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                {(["All", "Active", "Completed"] as const).map((s) => (
                  <FilterChip
                    key={s}
                    label={s === "All" ? "All" : s}
                    active={status === s}
                    onClick={() => setStatus(s)}
                    color={
                      s === "Active"    ? "border-emerald-400 bg-emerald-500 text-white shadow-sm scale-[1.04]" :
                      s === "Completed" ? "border-border bg-muted text-foreground shadow-sm scale-[1.04]" :
                      undefined
                    }
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Clear filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => exportCsv(filtered)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:scale-[1.03]"
                >
                  <Download className="h-4 w-4 text-primary" aria-hidden="true" />
                  Download CSV
                </button>
              </div>
            </div>
          </div>

          {/* Results summary */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{filtered.length}</strong> grant{filtered.length !== 1 ? "s" : ""}
              {hasFilters ? " matching filters" : ""} —
              total <strong className="text-foreground">{fmtFull(totalDisbursed)}</strong> across{" "}
              <strong className="text-foreground">{countries}</strong> {countries === 1 ? "country" : "countries"}
            </p>
            <p className="text-xs text-muted-foreground">Fiscal years 2022–2025</p>
          </div>

          {/* Desktop table */}
          {filtered.length > 0 ? (
            <>
              <div className="mt-4 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-5 py-4 text-left">
                        <SortButton col="grantee" label="Grantee" active={sortKey === "grantee"} dir={sortDir} onClick={toggleSort} />
                      </th>
                      <th className="px-4 py-4 text-left">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Program</span>
                      </th>
                      <th className="px-4 py-4 text-left">
                        <SortButton col="country" label="Country" active={sortKey === "country"} dir={sortDir} onClick={toggleSort} />
                      </th>
                      <th className="px-4 py-4 text-left">
                        <SortButton col="year" label="Year" active={sortKey === "year"} dir={sortDir} onClick={toggleSort} />
                      </th>
                      <th className="px-4 py-4 text-right">
                        <SortButton col="amount" label="Amount" active={sortKey === "amount"} dir={sortDir} onClick={toggleSort} />
                      </th>
                      <th className="px-5 py-4 text-left">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((g, i) => {
                      const meta = PROGRAM_META[g.program];
                      const Icon = meta.Icon;
                      return (
                        <tr
                          key={g.id}
                          className="group transition-colors hover:bg-surface"
                          style={{ animationDelay: `${i * 30}ms` }}
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{g.grantee}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 max-w-xs">{g.description}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.tagBg} ${meta.tagText}`}>
                              <Icon className="h-3 w-3" aria-hidden="true" />
                              {g.program}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">{g.country}</td>
                          <td className="px-4 py-4 text-muted-foreground">{g.year}</td>
                          <td className="px-4 py-4 text-right font-serif font-semibold text-foreground">{fmtFull(g.amount)}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              g.status === "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${g.status === "Active" ? "bg-emerald-500" : "bg-border"}`} />
                              {g.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border bg-surface">
                      <td colSpan={4} className="px-5 py-3 text-sm font-semibold text-foreground">
                        {filtered.length} grant{filtered.length !== 1 ? "s" : ""} shown
                      </td>
                      <td className="px-4 py-3 text-right font-serif text-lg font-semibold text-foreground">
                        {fmtFull(totalDisbursed)}
                      </td>
                      <td className="px-5 py-3" />
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="mt-4 space-y-3 md:hidden">
                {filtered.map((g) => {
                  const meta = PROGRAM_META[g.program];
                  const Icon = meta.Icon;
                  return (
                    <li key={g.id} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">{g.grantee}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{g.country} · {g.year}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shrink-0 ${
                          g.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                        }`}>
                          <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${g.status === "Active" ? "bg-emerald-500" : "bg-border"}`} />
                          {g.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{g.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.tagBg} ${meta.tagText}`}>
                          <Icon className="h-3 w-3" aria-hidden="true" />
                          {g.program}
                        </span>
                        <span className="font-serif text-lg font-semibold text-foreground">{fmtFull(g.amount)}</span>
                      </div>
                    </li>
                  );
                })}
                {/* Mobile total */}
                <li className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{filtered.length} grants shown</span>
                    <span className="font-serif text-xl font-semibold text-foreground">{fmtFull(totalDisbursed)}</span>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center shadow-card">
              <Search className="h-10 w-10 text-muted-foreground/40 mb-4" aria-hidden="true" />
              <p className="font-serif text-xl font-semibold text-foreground">No grants found</p>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or clearing some filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear all filters
              </button>
            </div>
          )}

          {/* Methodology note */}
          <p className="mt-8 text-xs text-muted-foreground">
            Amounts shown in USD at time of grant issuance. Figures may differ from audited financials due to currency conversion timing.
            Download the full dataset or visit the{" "}
            <a href="/transparency" className="text-primary hover:underline">Transparency page</a>{" "}
            for annual audits and Form 990 filings.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
