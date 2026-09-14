import type { Metadata } from "next";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";
import FaqPagePrototype from "@/components/homepage-prototype/faq-page";

export const metadata: Metadata = { title: "ხშირად დასმული კითხვები · Prototype" };

export default function FaqPage() {
  return <PrototypeTypographyTuner><FaqPagePrototype /></PrototypeTypographyTuner>;
}
