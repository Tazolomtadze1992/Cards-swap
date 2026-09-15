import type { ComponentProps } from "react";
import styles from "./badge.module.css";

// Adapted from shadcn/ui Badge (MIT):
// https://ui.shadcn.com/docs/components/radix/badge
// A noninteractive span with one audited appearance, replacing stock variants.
export function Badge(props: Omit<ComponentProps<"span">, "className" | "style">) {
  return <span {...props} data-slot="badge" className={styles.badge} />;
}
