import type { Metadata } from "next";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";
import ResourcesPagePrototype from "@/components/homepage-prototype/resources-page";

export const metadata: Metadata = { title: "რესურსები · Prototype" };
export default function ResourcesPage() {
  return <PrototypeTypographyTuner><ResourcesPagePrototype /></PrototypeTypographyTuner>;
}
