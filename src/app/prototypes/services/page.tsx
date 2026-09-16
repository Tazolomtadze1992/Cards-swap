import type { Metadata } from "next";
import ServicesPagePrototype from "@/components/homepage-prototype/services-page";

export const metadata: Metadata = { title: "მხარდამჭერი სერვისები · Prototype" };
export default function ServicesPage() {
  return <ServicesPagePrototype />;
}
