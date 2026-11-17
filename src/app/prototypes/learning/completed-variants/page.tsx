import type { Metadata } from "next";
import CompletedVariantsPage from "@/components/learning-completed-variants/completed-variants-page";

export const metadata: Metadata = { title: "დასრულებული თემა" };
export default function Page() {
  return <CompletedVariantsPage />;
}
