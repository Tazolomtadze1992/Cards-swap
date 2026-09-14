import type { Metadata } from "next";
import CardsPrototype from "@/components/cards-prototype/cards-prototype";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";

export const metadata: Metadata = { title: "Card playground · Click interaction" };

export default function CardsPage() {
  return <PrototypeTypographyTuner><CardsPrototype /></PrototypeTypographyTuner>;
}
