import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/stub-page";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Hauser Foundation" }, { name: "description", content: "Get in touch with the Hauser Foundation team." }] }),
  component: makeStubRoute("Contact us", "A validated contact form with helpful error states is coming in the next iteration."),
});
