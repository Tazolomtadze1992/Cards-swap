import type { ReactNode } from "react";
import { PageFooter } from "@/components/homepage-prototype/page-footer";

export default function PrototypeLayout({ children }: { children: ReactNode }) {
  return <div>{children}<PageFooter /></div>;
}
