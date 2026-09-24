"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";
import styles from "./site-footer.module.css";

export function PageFooter() {
  const pathname = usePathname();

  // The homepage footer already lives inside its FAQ gradient.
  if (pathname === "/prototypes/homepage") return null;

  return <div className={styles.standalone}><SiteFooter /></div>;
}
