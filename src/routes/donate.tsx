import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/stub-page";

export const Route = createFileRoute("/donate")({
  head: () => ({ meta: [{ title: "Donate — Hauser Foundation" }, { name: "description", content: "Make a tax-deductible donation to fund education, health, and community programs." }] }),
  component: makeStubRoute("Donate", "Our multi-step donation wizard (amount → details → confirmation) is up next."),
});
