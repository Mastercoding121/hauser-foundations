import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/stub-page";

export const Route = createFileRoute("/programs")({
  head: () => ({ meta: [{ title: "Programs — Hauser Foundation" }, { name: "description", content: "Explore our ongoing charitable initiatives in education, health, and climate resilience." }] }),
  component: makeStubRoute("Programs", "Our full programs catalog is on the way — detailed project cards with budgets, outcomes, and impact reports."),
});
