import type { Metadata } from "next";
import ArticlesPagePrototype from "@/components/homepage-prototype/articles-page";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";

export const metadata: Metadata = { title: "სტატია · Prototype" };

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ recommended?: string }> }) {
  const { recommended } = await searchParams;
  const recommendedCount = recommended === "2" ? 2 : recommended === "3" ? 3 : 5;
  return <PrototypeTypographyTuner><ArticlesPagePrototype recommendedCount={recommendedCount} /></PrototypeTypographyTuner>;
}
