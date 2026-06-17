import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useState } from "react";
import { Mail, MapPin, Phone, Check, Loader2 } from "lucide-react";
import heroImg from "@/assets/contact-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hauser Foundation" },
      { name: "description", content: "Get in touch with the Hauser Foundation. Partnership, press, and general inquiries." },
      { property: "og:title", content: "Contact the Hauser Foundation" },
      { property: "og:description", content: "Email, phone, and office address — plus a validated contact form." },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.subject.trim().length < 3) e.subject = "Please add a short subject.";
    if (form.message.trim().length < 10) e.message = "Please share at least a sentence (10+ characters).";
    return e;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const fieldClass = (err?: string) =>
    `min-h-12 w-full rounded-lg border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
      err
        ? "border-destructive focus:border-destructive focus:ring-destructive/30"
        : "border-input focus:border-primary focus:ring-primary/25"
    }`;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img src={heroImg} alt="" aria-hidden="true" width={1600} height={896} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="container-page py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contact</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let's start a <span className="italic text-gold">conversation.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/90 md:text-lg">
            Partnership inquiries, press, donor questions — we read every message and respond within two business days.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-background">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
          <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground">Full name</label>
                <input
                  id="name" type="text" autoComplete="name" required value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                  className={`mt-2 ${fieldClass(errors.name)}`}
                />
                {errors.name && <p id="name-err" role="alert" className="mt-1.5 text-sm text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">Email</label>
                <input
                  id="email" type="email" autoComplete="email" required value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                  className={`mt-2 ${fieldClass(errors.email)}`}
                />
                {errors.email && <p id="email-err" role="alert" className="mt-1.5 text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-foreground">Subject</label>
              <input
                id="subject" type="text" required value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subj-err" : undefined}
                className={`mt-2 ${fieldClass(errors.subject)}`}
              />
              {errors.subject && <p id="subj-err" role="alert" className="mt-1.5 text-sm text-destructive">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground">Message</label>
              <textarea
                id="message" rows={6} required value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "msg-err" : undefined}
                className={`mt-2 resize-y ${fieldClass(errors.message)}`}
              />
              {errors.message && <p id="msg-err" role="alert" className="mt-1.5 text-sm text-destructive">{errors.message}</p>}
            </div>
            <div className="flex items-center justify-between gap-4">
              <p aria-live="polite" className="min-h-6 text-sm">
                {status === "success" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground">
                    <Check className="h-4 w-4" aria-hidden="true" /> Message received — thank you.
                  </span>
                )}
              </p>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {status === "loading" ? "Sending" : "Send message"}
              </button>
            </div>
          </form>

          <aside aria-label="Contact information" className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <h2 className="font-serif text-lg font-semibold text-foreground">Reach us directly</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:hello@hauserfoundation.org" className="text-muted-foreground hover:text-foreground">hello@hauserfoundation.org</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href="tel:+18005551234" className="text-muted-foreground hover:text-foreground">+1 (800) 555-1234</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-foreground">Office</p>
                    <p className="text-muted-foreground">312 Garden Street, Suite 400<br />Boston, MA 02114</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-serif text-lg font-semibold text-foreground">Office hours</h2>
              <p className="mt-2 text-sm text-muted-foreground">Monday – Friday<br />9:00 a.m. – 5:30 p.m. ET</p>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
