import type { Metadata } from "next";
import LearningPage from "@/components/homepage-prototype/learning-page";

export const metadata: Metadata = { title: "სწავლა და პრაქტიკა · Prototype" };
export default function Page() {
  return <LearningPage />;
}
