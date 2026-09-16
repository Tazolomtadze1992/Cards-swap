import type { ComponentPropsWithoutRef } from "react";
import styles from "./reading-content.module.css";

type ReadingProps = ComponentPropsWithoutRef<"article"> & { width?: "reading" | "full" };

// Page positioning belongs to the parent; prose stays left aligned within its measure.
export function ReadingContent({ width = "reading", className, ...props }: ReadingProps) {
  return <article {...props} data-width={width} className={[styles.content, className].filter(Boolean).join(" ")} />;
}

export function ContentSection({ as: Tag = "section", width = "reading", className, ...props }: ComponentPropsWithoutRef<"section"> & {
  as?: "section" | "div";
  width?: "reading" | "full";
}) {
  return <Tag {...props} data-width={width} className={[styles.section, className].filter(Boolean).join(" ")} />;
}
