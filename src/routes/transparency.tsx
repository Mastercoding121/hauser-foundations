import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/stub-page";

export const Route = createFileRoute("/transparency")({
  head: () => ({ meta: [{ title: "Transparency — Hauser Foundation" }, { name: "description", content: "Financial reports, privacy policy, and how we use your funds." }] }),
  component: makeStubRoute("Transparency & Resources", "Annual reports, 990 filings, privacy policy, and our funds-allocation breakdown will live here."),
});
