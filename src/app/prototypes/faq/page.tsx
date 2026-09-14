import type { Metadata } from "next";
import FaqPagePrototype from "@/components/homepage-prototype/faq-page";

export const metadata: Metadata = { title: "ხშირად დასმული კითხვები · Prototype" };

export default function FaqPage() {
  return <FaqPagePrototype />;
}
