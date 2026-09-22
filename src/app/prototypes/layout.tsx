import type { ReactNode } from "react";
import { RouteFooter } from "@/components/homepage-prototype/route-footer";

export default function PrototypeLayout({ children }: { children: ReactNode }) {
  return <div>{children}<RouteFooter /></div>;
}
