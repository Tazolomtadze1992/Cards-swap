import type { Metadata } from "next";
import CompletedVariantsPage from "@/components/learning-completed-variants/completed-variants-page";

export const metadata: Metadata = { title: "დასრულებული თემა · ვარიანტები" };
export default async function Page({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  return <CompletedVariantsPage initialVariant={Number(v) || 1} />;
}
