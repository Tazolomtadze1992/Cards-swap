import type { Metadata } from "next";
import LearningPage from "@/components/homepage-prototype/learning-page";

export const metadata: Metadata = { title: "სწავლა და პრაქტიკა · Prototype" };
export default async function Page({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const { age } = await searchParams;
  return <LearningPage initialAge={age === "10-13" ? age : ""} />;
}
