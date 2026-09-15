"use client";

import type { ComponentProps } from "react";
import styles from "./input-group.module.css";

// Adapted from shadcn/ui Input Group (MIT):
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/input-group.tsx
// Keep group/control/addon composition and addon focus behavior; use our tokens.
type StyledProps<T> = Omit<T, "className" | "style">;

export function InputGroup({ appearance = "default", ...props }: StyledProps<ComponentProps<"div">> & { appearance?: "default" | "on-brand" }) {
  return <div role="group" {...props} className={styles.group} data-slot="input-group" data-appearance={appearance} />;
}

export function InputGroupInput(props: StyledProps<ComponentProps<"input">>) {
  return <input {...props} className={styles.input} data-slot="input-group-control" />;
}

export function InputGroupAddon({ align = "inline-start", ...props }: StyledProps<ComponentProps<"div">> & { align?: "inline-start" | "inline-end" }) {
  return <div {...props} className={styles.addon} data-slot="input-group-addon" data-align={align} onClick={event => {
    props.onClick?.(event);
    if (!event.defaultPrevented && !(event.target as HTMLElement).closest("button")) event.currentTarget.parentElement?.querySelector("input")?.focus();
  }} />;
}

export function InputGroupButton(props: StyledProps<ComponentProps<"button">>) {
  return <button {...props} type="button" className={styles.button} data-slot="input-group-button" />;
}
