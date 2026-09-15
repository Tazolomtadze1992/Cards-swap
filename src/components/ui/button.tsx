"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./button.module.css";

// Adapted from shadcn/ui's Radix Button (MIT):
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx
// Keep Slot composition and CVA; the prototype owns every visual value.
const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      inverse: styles.inverse,
      overlay: styles.overlay,
      cardAction: styles.cardAction,
      subtle: styles.subtle,
      reset: styles.reset,
    },
    size: {
      compact: styles.compact,
      default: styles.default,
      prominent: styles.prominent,
      contact: styles.contact,
      resource: styles.resource,
      icon: styles.icon,
    },
    fullWidth: { true: styles.fullWidth },
  },
  defaultVariants: { variant: "primary", size: "default" },
});

type Appearance = VariantProps<typeof buttonVariants>;
type ButtonProps = Omit<React.ComponentProps<"button">, "className" | "style"> & Appearance & {
  asChild?: boolean;
};

function Button({ variant = "primary", size = "default", fullWidth, asChild = false, disabled, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  // A disabled composed link must suppress the child's own click handler too.
  return <Comp {...props} data-slot="button" data-variant={variant} data-size={size}
    className={buttonVariants({ variant, size, fullWidth })}
    type={asChild ? undefined : type ?? "button"}
    disabled={asChild ? undefined : disabled}
    aria-disabled={disabled || undefined}
    tabIndex={disabled ? -1 : props.tabIndex}
    onClickCapture={event => {
      if (disabled) { event.preventDefault(); event.stopPropagation(); return; }
      props.onClickCapture?.(event);
    }}
  />;
}

// Visual label inside an already interactive card: never nest a button in a link.
function ButtonSurface({ children }: { children: React.ReactNode }) {
  return <span className={buttonVariants({ variant: "cardAction", size: "prominent", fullWidth: true })} data-slot="button-surface">{children}</span>;
}

export { Button, ButtonSurface };
