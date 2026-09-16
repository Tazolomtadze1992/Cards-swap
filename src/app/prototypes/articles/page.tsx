import type { Metadata } from "next";
import ArticlesPagePrototype from "@/components/homepage-prototype/articles-page";

export const metadata: Metadata = { title: "სტატია · Prototype" };

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ recommended?: string; age?: string }> }) {
  const { recommended, age } = await searchParams;
  const recommendedCount = recommended === "2" ? 2 : recommended === "3" ? 3 : 5;
  return <ArticlesPagePrototype recommendedCount={recommendedCount} age={age} />;
}
