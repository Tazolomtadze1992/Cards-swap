import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./card.module.css";

// Adapted from shadcn/ui Card (MIT):
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx
// Structural slots only; finished card families supply the prototype's layouts.
function Card({ asChild = false, className, ...props }: ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return <Comp {...props} data-slot="card" className={[styles.card, className].filter(Boolean).join(" ")} />;
}
function CardHeader(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-header" />;
}
function CardContent(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-content" />;
}
function CardTitle({ headingLevel = 2, className, ...props }: ComponentProps<"h2"> & { headingLevel?: 2 | 3 | 4 }) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  return <Heading {...props} data-slot="card-title" className={[styles.title, className].filter(Boolean).join(" ")} />;
}
function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p {...props} data-slot="card-description" className={[styles.description, className].filter(Boolean).join(" ")} />;
}
function CardFooter(props: ComponentProps<"div">) {
  return <div {...props} data-slot="card-footer" />;
}
export { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter };
