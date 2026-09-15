"use client";

import type { ComponentProps } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import styles from "./separator.module.css";

// Adapted from shadcn/ui Separator (MIT). The prototype owns color and thickness.
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/separator.tsx
type SeparatorProps = Omit<ComponentProps<typeof SeparatorPrimitive.Root>, "className" | "style" | "asChild"> & {
  tone?: "subtle" | "inverse";
};
export function Separator({ orientation = "horizontal", decorative = true, tone = "subtle", ...props }: SeparatorProps) {
  return <SeparatorPrimitive.Root {...props} orientation={orientation} decorative={decorative} data-slot="separator" data-tone={tone} className={styles.separator} />;
}
