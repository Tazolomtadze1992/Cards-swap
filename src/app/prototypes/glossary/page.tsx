import type { Metadata } from "next";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";
import GlossaryPagePrototype from "@/components/homepage-prototype/glossary-page";

export const metadata: Metadata = { title: "ლექსიკონი · Prototype" };
export default function GlossaryPage() {
  return <PrototypeTypographyTuner><GlossaryPagePrototype /></PrototypeTypographyTuner>;
}
