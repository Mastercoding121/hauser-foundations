import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useState } from "react";
import { Check, CreditCard, Landmark, Wallet, ArrowLeft, ArrowRight, Heart, Loader2 } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Hauser Foundation" },
      { name: "description", content: "Make a secure, tax-deductible donation to fund education, health, and community programs." },
      { property: "og:title", content: "Donate to the Hauser Foundation" },
      { property: "og:description", content: "94¢ of every dollar goes directly to programs. Donate securely in three quick steps." },
    ],
  }),
  component: DonatePage,
});

const PRESETS = [25, 50, 100, 250] as const;
type Method = "card" | "bank" | "wallet";
const METHODS: { id: Method; label: string; Icon: typeof CreditCard; desc: string }[] = [
  { id: "card", label: "Credit / Debit Card", Icon: CreditCard, desc: "Visa, Mastercard, Amex, Discover" },
  { id: "bank", label: "Bank transfer (ACH)", Icon: Landmark, desc: "Lower fees, 1–3 business days" },
  { id: "wallet", label: "Apple Pay / Google Pay", Icon: Wallet, desc: "One-tap secure checkout" },
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
    `min-h-12 w-full rounded-lg border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
      err ? "border-destructive focus:ring-destructive/30" : "border-input focus:border-primary focus:ring-primary/25"
    }`;

  return (
    <PageLayout>
      <section className="bg-surface">
        <div className="container-page py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Donate</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Your gift, at work in days.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            94¢ of every dollar goes directly to programs. Donations are tax-deductible
            in the U.S. (EIN 00-0000000).
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-20">
          {/* Stepper */}
          <ol aria-label="Donation progress" className="mx-auto flex max-w-2xl items-center justify-between gap-2">
            {["Amount", "Your details", "Confirmation"].map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <li key={label} className="flex flex-1 items-center gap-3">
                  <span
                    aria-current={active ? "step" : undefined}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold ring-2 transition-colors ${
                      done ? "bg-primary text-primary-foreground ring-primary" :
                      active ? "bg-primary text-primary-foreground ring-primary" :
                      "bg-card text-muted-foreground ring-border"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : n}
                  </span>
                  <span className={`hidden text-sm font-medium sm:inline ${active || done ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                  {n < 3 && <span aria-hidden="true" className={`mx-1 hidden h-px flex-1 sm:block ${step > n ? "bg-primary" : "bg-border"}`} />}
                </li>
              );
            })}
          </ol>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-card md:p-10">
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Choose your gift</h2>
                <p className="mt-1 text-sm text-muted-foreground">Every amount makes a measurable difference.</p>

                <div role="radiogroup" aria-label="Donation frequency" className="mt-6 inline-flex rounded-full border border-border bg-muted p-1">
                  {(["once", "monthly"] as const).map((f) => (
                    <button
                      key={f} type="button" role="radio" aria-checked={frequency === f}
                      onClick={() => setFrequency(f)}
                      className={`min-h-10 rounded-full px-5 text-sm font-semibold capitalize transition-colors ${
                        frequency === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
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
                          key={p} type="button"
                          aria-pressed={selected}
                          onClick={() => { setAmount(p); setCustom(""); }}
                          className={`min-h-14 rounded-xl border-2 px-4 py-3 text-lg font-serif font-semibold transition-all ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground shadow-md"
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                        >
                          ${p}
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

                <p className="mt-6 rounded-lg bg-accent/60 p-4 text-sm text-accent-foreground">
                  <strong>${effectiveAmount || 0} {frequency === "monthly" ? "per month" : ""}</strong>{" "}
                  could fund <em>school supplies for {Math.max(1, Math.round((effectiveAmount || 0) / 12))} students</em> this term.
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Your details</h2>
                <p className="mt-1 text-sm text-muted-foreground">We'll send your tax receipt here.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fn" className="block text-sm font-semibold text-foreground">First name</label>
                    <input
                      id="fn" autoComplete="given-name" required value={details.firstName}
                      onChange={(e) => setDetails((d) => ({ ...d, firstName: e.target.value }))}
                      aria-invalid={!!stepErrors.firstName}
                      className={`mt-2 ${fieldCls(stepErrors.firstName)}`}
                    />
                    {stepErrors.firstName && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="ln" className="block text-sm font-semibold text-foreground">Last name</label>
                    <input
                      id="ln" autoComplete="family-name" required value={details.lastName}
                      onChange={(e) => setDetails((d) => ({ ...d, lastName: e.target.value }))}
                      aria-invalid={!!stepErrors.lastName}
                      className={`mt-2 ${fieldCls(stepErrors.lastName)}`}
                    />
                    {stepErrors.lastName && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.lastName}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="em" className="block text-sm font-semibold text-foreground">Email</label>
                  <input
                    id="em" type="email" autoComplete="email" required value={details.email}
                    onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                    aria-invalid={!!stepErrors.email}
                    className={`mt-2 ${fieldCls(stepErrors.email)}`}
                  />
                  {stepErrors.email && <p role="alert" className="mt-1.5 text-sm text-destructive">{stepErrors.email}</p>}
                </div>

                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold text-foreground">Payment method</legend>
                  <div className="mt-3 space-y-2">
                    {METHODS.map(({ id, label, Icon, desc }) => {
                      const selected = method === id;
                      return (
                        <label
                          key={id}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors ${
                            selected ? "border-primary bg-accent/40" : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <input
                            type="radio" name="method" value={id} checked={selected}
                            onChange={() => setMethod(id)}
                            className="sr-only"
                          />
                          <span aria-hidden="true" className={`grid h-10 w-10 place-items-center rounded-lg ${selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="flex-1">
                            <span className="block font-semibold text-foreground">{label}</span>
                            <span className="block text-xs text-muted-foreground">{desc}</span>
                          </span>
                          <span aria-hidden="true" className={`grid h-5 w-5 place-items-center rounded-full border-2 ${selected ? "border-primary bg-primary" : "border-border"}`}>
                            {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <p className="mt-5 flex items-baseline justify-between rounded-lg bg-muted p-4 text-sm">
                  <span className="text-muted-foreground">Your gift</span>
                  <strong className="font-serif text-xl text-foreground">
                    ${effectiveAmount} {frequency === "monthly" && <span className="text-sm font-medium text-muted-foreground">/ month</span>}
                  </strong>
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <span aria-hidden="true" className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Heart className="h-7 w-7" fill="currentColor" />
                </span>
                <h2 className="mt-5 font-serif text-3xl font-semibold text-foreground">Thank you, {details.firstName}.</h2>
                <p className="mt-2 text-muted-foreground">
                  Your {frequency === "monthly" ? "monthly" : "one-time"} gift of <strong>${effectiveAmount}</strong> is on its way to the programs that need it most.
                </p>
                <div className="mx-auto mt-7 max-w-sm rounded-xl border border-border bg-surface p-5 text-left text-sm">
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Donor</span><span className="font-semibold text-foreground">{details.firstName} {details.lastName}</span></div>
                  <div className="flex justify-between border-b border-border py-2"><span className="text-muted-foreground">Email</span><span className="font-semibold text-foreground">{details.email}</span></div>
                  <div className="flex justify-between border-b border-border py-2"><span className="text-muted-foreground">Frequency</span><span className="font-semibold capitalize text-foreground">{frequency === "once" ? "One-time" : "Monthly"}</span></div>
                  <div className="flex justify-between pt-2"><span className="text-muted-foreground">Amount</span><span className="font-serif text-lg font-semibold text-foreground">${effectiveAmount}</span></div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">A receipt has been sent to your email.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link to="/programs" className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">See your impact</Link>
                  <Link to="/" className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground">Back to home</Link>
                </div>
              </div>
            )}

            {step < 3 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button" onClick={back} disabled={step === 1}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button
                  type="button" onClick={next} disabled={submitting}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {step === 2 ? (submitting ? "Processing" : "Complete donation") : "Continue"}
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
