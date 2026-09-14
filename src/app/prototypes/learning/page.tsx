import type { Metadata } from "next";
import LearningPage from "@/components/homepage-prototype/learning-page";
import { PrototypeTypographyTuner } from "@/components/homepage-prototype/prototype-typography";

export const metadata: Metadata = { title: "სწავლა და პრაქტიკა · Prototype" };
export default function Page() {
  return <PrototypeTypographyTuner><LearningPage /></PrototypeTypographyTuner>;
}
