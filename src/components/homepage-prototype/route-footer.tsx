"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";

export function RouteFooter() {
  const pathname = usePathname();
  // The homepage renders its disclaimer inside the FAQ gradient.
  return pathname.replace(/\/$/, "") === "/prototypes/homepage" ? null : <SiteFooter />;
}
