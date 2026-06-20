import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useState } from "react";
import { Check, CreditCard, Landmark, Wallet, ArrowLeft, ArrowRight, Heart, Loader2, Sparkles, Shield } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Hauser Foundation" },
      { name: "description", content: "Make a secure, tax-deductible donation to fund education, health, and community programs." },
    ],
  }),
  component: DonatePage,
});

const PRESETS = [25, 50, 100, 250] as const;
type Method = "card" | "bank" | "wallet";
const METHODS: { id: Method; label: string; Icon: typeof CreditCard; desc: string; color: string }[] = [
  { id: "card", label: "Credit / Debit Card", Icon: CreditCard, desc: "Visa, Mastercard, Amex, Discover", color: "icon-blue" },
  { id: "bank", label: "Bank transfer (ACH)", Icon: Landmark, desc: "Lower fees, 1–3 business days", color: "icon-emerald" },
  { id: "wallet", label: "Apple Pay / Google Pay", Icon: Wallet, desc: "One-tap secure checkout", color: "icon-violet" },
];

const IMPACT = [
  { amount: 25, text: "school supplies for 2 students this term" },
  { amount: 50, text: "a vaccination course for 5 children" },
  { amount: 100, text: "a farmer's first season of training" },
  { amount: 250, text: "a month of mobile clinic operations" },
];

function DonatePage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [details, setDetails] = useState({ firstName: "", lastName: "", email: "" });
  const [method, setMethod] = useState<Method>("card");
  const [submitting, setSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const effectiveAmount = custom ? Number(custom) : amount;

  const impactText = IMPACT.find((i) => effectiveAmount >= i.amount) || IMPACT[0];

  const next = async () => {
    setStepErrors({});
    if (step === 1) {
      if (!effectiveAmount || effectiveAmount < 1) {
        setStepErrors({ amount: "Please choose or enter an amount of at least $1." });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const errs: Record<string, string> = {};
      if (details.firstName.trim().length < 2) errs.firstName = "Please enter your first name.";
      if (details.lastName.trim().length < 2) errs.lastName = "Please enter your last name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) errs.email = "Please enter a valid email address.";
      if (Object.keys(errs).length) { setStepErrors(errs); return; }
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 1100));
      setSubmitting(false);
      setStep(3);
    }
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const fieldCls = (err?: string) =>
    `min-h-12 w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
      err ? "border-destructive focus:ring-destructive/30" : "border-input focus:border-primary focus:ring-primary/25"
    }`;

  const steps = ["Amount", "Your details", "Confirmation"];

  return (
    <PageLayout>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/85 text-primary-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div className="container-page py-12 md:py-16">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl icon-gold">
              <Heart className="h-5 w-5" fill="currentColor" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Donate</p>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-primary-foreground md:text-3xl">
                Your gift, at work in days.
              </h1>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              { icon: Shield, text: "Secure & encrypted" },
              { icon: Check, text: "Tax-deductible (EIN 00-0000000)" },
              { icon: Sparkles, text: "94¢ per $ to programs" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium text-primary-foreground/90">
                <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-12 md:py-20">
          {/* Stepper */}
          <ol aria-label="Donation progress" className="mx-auto flex max-w-2xl items-center justify-between gap-2 mb-10">
            {steps.map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <span
                    aria-current={active ? "step" : undefined}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold ring-2 transition-all duration-300 ${
                      done ? "bg-emerald-500 text-white ring-emerald-500 shadow-md" :
                      active ? "bg-primary text-primary-foreground ring-primary shadow-md" :
                      "bg-card text-muted-foreground ring-border"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : n}
                  </span>
                  <span className={`hidden text-sm font-medium sm:inline transition-colors ${active || done ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                  {n < 3 && <span aria-hidden="true" className={`mx-1 hidden h-px flex-1 sm:block transition-all duration-500 ${step > n ? "bg-emerald-400" : "bg-border"}`} />}
                </li>
              );
            })}
          </ol>

          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-card md:p-10">
            {/* Step 1: Amount */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Choose your gift</h2>
                <p className="mt-1 text-sm text-muted-foreground">Every amount makes a measurable difference.</p>

                <div role="radiogroup" aria-label="Donation frequency" className="mt-6 inline-flex rounded-full border border-border bg-muted p-1">
                  {(["once", "monthly"] as const).map((f) => (
                    <button
                      key={f} type="button" role="radio" aria-checked={frequency === f}
                      onClick={() => setFrequency(f)}
                      className={`min-h-10 rounded-full px-6 text-sm font-semibold capitalize transition-all duration-200 ${
                        frequency === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f === "once" ? "One-time" : "Monthly"}
                    </button>
                  ))}
                </div>

                <fieldset className="mt-6">
                  <legend className="sr-only">Preset amounts</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {PRESETS.map((p) => {
                      const selected = !custom && amount === p;
                      return (
                        <button
                          key={p} type="button" aria-pressed={selected}
                          onClick={() => { setAmount(p); setCustom(""); }}
                          className={`min-h-16 rounded-xl border-2 px-4 py-3 text-lg font-serif font-semibold transition-all duration-200 ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.03]"
                              : "border-border bg-background text-foreground hover:border-primary/50 hover:scale-[1.02]"
                          }`}
                        >
                          ${p}
                          {selected && <span className="block text-xs font-sans font-normal opacity-80">{frequency === "monthly" ? "/mo" : "once"}</span>}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-5">
                  <label htmlFor="custom" className="block text-sm font-semibold text-foreground">Or enter a custom amount</label>
                  <div className="relative mt-2">
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-base font-semibold text-muted-foreground">$</span>
                    <input
                      id="custom" type="number" inputMode="decimal" min={1} placeholder="Other amount"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      className={`pl-9 ${fieldCls(stepErrors.amount)}`}
                    />
                  </div>
                  {stepErrors.amount && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.amount}</p>}
                </div>

                {/* Impact preview */}
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <Sparkles className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    Your impact
                  </p>
                  <p className="mt-1 text-sm text-emerald-700">
                    <strong>${effectiveAmount || 0}{frequency === "monthly" ? " per month" : ""}</strong>{" "}
                    could fund <em>{impactText.text}</em>.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Your details</h2>
                <p className="mt-1 text-sm text-muted-foreground">We'll send your tax receipt here.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fn" className="block text-sm font-semibold text-foreground">First name</label>
                    <input id="fn" autoComplete="given-name" required value={details.firstName}
                      onChange={(e) => setDetails((d) => ({ ...d, firstName: e.target.value }))}
                      aria-invalid={!!stepErrors.firstName}
                      className={`mt-2 ${fieldCls(stepErrors.firstName)}`} placeholder="Jane" />
                    {stepErrors.firstName && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="ln" className="block text-sm font-semibold text-foreground">Last name</label>
                    <input id="ln" autoComplete="family-name" required value={details.lastName}
                      onChange={(e) => setDetails((d) => ({ ...d, lastName: e.target.value }))}
                      aria-invalid={!!stepErrors.lastName}
                      className={`mt-2 ${fieldCls(stepErrors.lastName)}`} placeholder="Smith" />
                    {stepErrors.lastName && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.lastName}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="em" className="block text-sm font-semibold text-foreground">Email</label>
                  <input id="em" type="email" autoComplete="email" required value={details.email}
                    onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                    aria-invalid={!!stepErrors.email}
                    className={`mt-2 ${fieldCls(stepErrors.email)}`} placeholder="jane@example.com" />
                  {stepErrors.email && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.email}</p>}
                </div>

                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold text-foreground">Payment method</legend>
                  <div className="mt-3 space-y-2">
                    {METHODS.map(({ id, label, Icon, desc, color }) => {
                      const selected = method === id;
                      return (
                        <label
                          key={id}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                            selected ? "border-primary bg-accent/30 shadow-sm" : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <input type="radio" name="method" value={id} checked={selected}
                            onChange={() => setMethod(id)} className="sr-only" />
                          <span className={`grid h-10 w-10 place-items-center rounded-xl shadow-sm ${selected ? color : "bg-muted"}`}>
                            <Icon className={`h-5 w-5 ${selected ? "text-white" : "text-foreground"}`} />
                          </span>
                          <span className="flex-1">
                            <span className="block font-semibold text-foreground">{label}</span>
                            <span className="block text-xs text-muted-foreground">{desc}</span>
                          </span>
                          <span className={`grid h-5 w-5 place-items-center rounded-full border-2 transition-all ${selected ? "border-primary bg-primary" : "border-border"}`}>
                            {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-5 flex items-baseline justify-between rounded-xl bg-muted p-4 text-sm">
                  <span className="text-muted-foreground">Your gift</span>
                  <strong className="font-serif text-xl text-foreground">
                    ${effectiveAmount} {frequency === "monthly" && <span className="text-sm font-medium text-muted-foreground">/ month</span>}
                  </strong>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="text-center">
                <span aria-hidden="true" className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg animate-scale-in">
                  <Heart className="h-9 w-9" fill="currentColor" />
                </span>
                <h2 className="mt-6 font-serif text-3xl font-semibold text-foreground animate-fade-up delay-100">
                  Thank you, {details.firstName}!
                </h2>
                <p className="mt-2 text-muted-foreground animate-fade-up delay-200">
                  Your {frequency === "monthly" ? "monthly" : "one-time"} gift of <strong className="text-foreground">${effectiveAmount}</strong> is on its way to the programs that need it most.
                </p>

                <div className="mx-auto mt-7 max-w-sm rounded-xl border border-border bg-surface p-5 text-left text-sm animate-fade-up delay-300">
                  {[
                    { label: "Donor", val: `${details.firstName} ${details.lastName}` },
                    { label: "Email", val: details.email },
                    { label: "Frequency", val: frequency === "once" ? "One-time" : "Monthly" },
                    { label: "Amount", val: `$${effectiveAmount}`, serif: true },
                  ].map((row, i, arr) => (
                    <div key={row.label} className={`flex justify-between py-2 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={`font-semibold text-foreground ${row.serif ? "font-serif text-lg" : ""}`}>{row.val}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm text-muted-foreground animate-fade-up delay-400">A receipt has been sent to your email.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3 animate-fade-up delay-500">
                  <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary/80 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:scale-[1.03] transition-transform">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    See your impact
                  </Link>
                  <Link to="/" className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                    Back to home
                  </Link>
                </div>
              </div>
            )}

            {step < 3 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button" onClick={back} disabled={step === 1}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground disabled:opacity-40 hover:bg-secondary transition-all"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button
                  type="button" onClick={next} disabled={submitting}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary/80 px-7 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.03] hover:shadow-md disabled:opacity-70"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {step === 2 ? (submitting ? "Processing…" : "Complete donation") : "Continue"}
                  {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
