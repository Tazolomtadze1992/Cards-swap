import type { Metadata } from "next";
import MapVariantsPage from "@/components/services-map-variants/map-variants-page";

export const metadata: Metadata = { title: "დახმარების რუკა · ვარიანტები" };
export default async function Page({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = await searchParams;
  return <MapVariantsPage initialVariant={Number(v) || 1} />;
}
