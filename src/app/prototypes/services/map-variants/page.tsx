import type { Metadata } from "next";
import MapVariantsPage from "@/components/services-map-variants/map-variants-page";

export const metadata: Metadata = { title: "დახმარების რუკა" };
export default function Page() {
  return <MapVariantsPage />;
}
