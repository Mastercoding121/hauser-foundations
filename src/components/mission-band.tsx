export function MissionBand() {
  return (
    <section aria-labelledby="mission-heading" className="bg-background">
      <div className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Our mission</p>
          <h2
            id="mission-heading"
            className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            We believe every person deserves the dignity of{" "}
            <em className="text-primary">opportunity</em> — and that giving should be
            transparent, locally led, and measured by outcomes, not promises.
          </h2>
        </div>
      </div>
    </section>
  );
}
