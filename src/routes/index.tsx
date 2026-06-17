import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
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
    <PageLayout>
      <HeroVideo />
      <MissionBand />
      <ImpactStats />
      <ProgramsPreview />
      <Newsletter />
    </PageLayout>
  );
}
