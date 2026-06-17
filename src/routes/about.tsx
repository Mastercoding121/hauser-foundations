import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/stub-page";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Hauser Foundation" }, { name: "description", content: "Our history, leadership, and the values that guide our work." }] }),
  component: makeStubRoute("About the Foundation", "Leadership, board of directors, and our 27-year history of community partnership — coming next."),
});
