import type { ReactNode } from "react";
import { Separator } from "./separator";
import styles from "./action-row.module.css";

// Supply existing Buttons/links in reading order: secondary first, primary last.
export function ActionRow({ children, spacing = "standard", align = "split" }: {
  children: ReactNode;
  spacing?: "standard" | "airy";
  align?: "split" | "center";
}) {
  return <div className={styles.area} data-spacing={spacing}>
    <Separator />
    <div className={styles.actions} data-align={align}>{children}</div>
  </div>;
}
