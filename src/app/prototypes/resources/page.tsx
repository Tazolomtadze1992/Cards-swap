import type { Metadata } from "next";
import ResourcesPagePrototype from "@/components/homepage-prototype/resources-page";

export const metadata: Metadata = { title: "რესურსები · Prototype" };
export default function ResourcesPage() {
  return <ResourcesPagePrototype />;
}
