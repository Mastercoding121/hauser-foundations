import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { useInView } from "@/hooks/use-in-view";
import { useState } from "react";
import { Mail, MapPin, Phone, Check, Loader2, Clock, MessageSquare, Handshake, Newspaper } from "lucide-react";
import heroImg from "@/assets/contact-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hauser Foundation" },
      { name: "description", content: "Get in touch with the Hauser Foundation. Partnership, press, and general inquiries." },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const inquiryTypes = [
  { icon: Handshake, label: "Partnership", color: "icon-violet" },
  { icon: Newspaper, label: "Press", color: "icon-blue" },
  { icon: MessageSquare, label: "General", color: "icon-emerald" },
];

function ContactPage() {
  const [formRef, formInView] = useInView(0.1);
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
    `min-h-12 w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
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
        <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div className="container-page py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold animate-fade-in">Contact</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl animate-fade-up delay-100">
            Let's start a <span className="italic text-gold">conversation.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/90 md:text-lg animate-fade-up delay-200">
            Partnership inquiries, press, donor questions — we read every message and respond within two business days.
          </p>

          {/* Inquiry type chips */}
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up delay-300">
            {inquiryTypes.map(({ icon: Icon, label, color }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground/90 backdrop-blur">
                <span className={`grid h-6 w-6 place-items-center rounded-md ${color}`}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-background">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ${formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full icon-emerald shadow-lg mb-5">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Message received!</h2>
                <p className="mt-2 text-muted-foreground">Thank you for reaching out. We'll respond within two business days.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
                <h2 className="font-serif text-xl font-semibold text-foreground">Send us a message</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground">Full name</label>
                    <input
                      id="name" type="text" autoComplete="name" required value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      aria-invalid={!!errors.name}
                      className={`mt-2 ${fieldClass(errors.name)}`}
                      placeholder="Jane Smith"
                    />
                    {errors.name && <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">Email</label>
                    <input
                      id="email" type="email" autoComplete="email" required value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      aria-invalid={!!errors.email}
                      className={`mt-2 ${fieldClass(errors.email)}`}
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground">Subject</label>
                  <input
                    id="subject" type="text" required value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    aria-invalid={!!errors.subject}
                    className={`mt-2 ${fieldClass(errors.subject)}`}
                    placeholder="Partnership inquiry, press request, general question…"
                  />
                  {errors.subject && <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground">Message</label>
                  <textarea
                    id="message" rows={6} required value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    aria-invalid={!!errors.message}
                    className={`mt-2 resize-y ${fieldClass(errors.message)}`}
                    placeholder="Tell us about yourself and how we can help…"
                  />
                  {errors.message && <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.message}</p>}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary/80 px-7 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md disabled:opacity-70"
                  >
                    {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {status === "loading" ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside aria-label="Contact information" className={`space-y-5 transition-all duration-700 delay-200 ${formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-serif text-lg font-semibold text-foreground">Reach us directly</h2>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl icon-blue shadow-sm">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:hello@hauserfoundation.org" className="text-muted-foreground hover:text-foreground transition-colors">hello@hauserfoundation.org</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl icon-emerald shadow-sm">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href="tel:+18005551234" className="text-muted-foreground hover:text-foreground transition-colors">+1 (800) 555-1234</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl icon-rose shadow-sm">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Office</p>
                    <p className="text-muted-foreground">312 Garden Street, Suite 400<br />Boston, MA 02114</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl icon-amber shadow-sm">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="font-serif text-lg font-semibold text-foreground">Office hours</h2>
              </div>
              <p className="text-sm text-muted-foreground">Monday – Friday<br />9:00 a.m. – 5:30 p.m. ET</p>
              <p className="mt-3 text-sm text-muted-foreground">We respond to all messages within <strong className="text-foreground">2 business days.</strong></p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-primary">Media inquiries</p>
              <p className="mt-1 text-sm text-muted-foreground">For press and media requests, please email <a href="mailto:press@hauserfoundation.org" className="text-primary hover:underline">press@hauserfoundation.org</a> directly for a faster response.</p>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
