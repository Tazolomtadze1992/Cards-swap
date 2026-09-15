import type { Metadata } from "next";
import CardsPrototype from "@/components/cards-prototype/cards-prototype";

export const metadata: Metadata = { title: "Card playground · Click interaction" };

export default function CardsPage() {
  return <CardsPrototype />;
}
