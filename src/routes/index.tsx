import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroVideo } from "@/components/hero-video";
import { MissionBand } from "@/components/mission-band";
import { ImpactStats } from "@/components/impact-stats";
import { ProgramsPreview } from "@/components/programs-preview";
import { Newsletter } from "@/components/newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hauser Foundation — Building Hope, Funding Change" },
      { name: "description", content: "Partnering with local leaders to deliver education, health, and economic opportunity with full transparency on every dollar." },
      { property: "og:title", content: "Hauser Foundation — Building Hope, Funding Change" },
      { property: "og:description", content: "Education, health, and community programs around the world. Transparent and accountable." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <HeroVideo />
        <MissionBand />
        <ImpactStats />
        <ProgramsPreview />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
