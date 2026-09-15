import type { Metadata } from "next";
import LearningPage from "@/components/homepage-prototype/learning-page";

export const metadata: Metadata = { title: "14–18 · სწავლა და პრაქტიკა · Prototype" };
export default function Page() { return <LearningPage initialAge="14-18" />; }
