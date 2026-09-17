"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import styles from "./accordion.module.css";

// Adapted from shadcn/ui's Radix Accordion (MIT):
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/accordion.tsx
// Preserve primitive composition; the prototype owns styling and the state icons.
type StyledProps<T> = T extends unknown ? Omit<T, "className" | "style"> : never;

function Accordion({ appearance = "default", ...props }: StyledProps<React.ComponentProps<typeof AccordionPrimitive.Root>> & { appearance?: "default" | "light" }) {
  return <AccordionPrimitive.Root {...props} data-slot="accordion" data-appearance={appearance} className={styles.root} />;
}

function AccordionItem(props: StyledProps<React.ComponentProps<typeof AccordionPrimitive.Item>>) {
  return <AccordionPrimitive.Item {...props} data-slot="accordion-item" className={styles.item} />;
}

function AccordionTrigger({ children, headingLevel = 3, ...props }: StyledProps<React.ComponentProps<typeof AccordionPrimitive.Trigger>> & { headingLevel?: 2 | 3 | 4 | 5 | 6 }) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";
  return <AccordionPrimitive.Header asChild>
    <Heading className={styles.heading}>
      <AccordionPrimitive.Trigger {...props} data-slot="accordion-trigger" className={styles.trigger}>
        <span>{children}</span>
        <span className={styles.icon} aria-hidden="true">
          <span className={styles.iconMark}><span className={styles.iconHorizontal} /><span className={styles.iconVertical} /></span>
        </span>
      </AccordionPrimitive.Trigger>
    </Heading>
  </AccordionPrimitive.Header>;
}

function AccordionContent({ children, ...props }: StyledProps<React.ComponentProps<typeof AccordionPrimitive.Content>>) {
  const content = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const element = content.current;
    if (!element) return;
    // Force mounting permits reversible CSS transitions. Closed answers must
    // still be absent from keyboard navigation and the accessibility tree.
    const sync = () => { element.inert = element.dataset.state !== "open"; };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(element, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);
  return <AccordionPrimitive.Content {...props} forceMount ref={content} data-slot="accordion-content" className={styles.content}>
    <div className={styles.reveal}><div className={styles.clip}><div className={styles.answer}>{children}</div></div></div>
  </AccordionPrimitive.Content>;
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
