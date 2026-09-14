import type { Metadata } from "next";
import CardsPrototype from "@/components/cards-prototype/cards-prototype";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";

export const metadata: Metadata = { title: "Full homepage · Prototype" };

export default function HomepagePage() {
  return <PrototypeTypographyTuner><CardsPrototype homepage /></PrototypeTypographyTuner>;
}
