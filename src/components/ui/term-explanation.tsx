"use client";

import * as Popover from "@radix-ui/react-popover";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./icon";
import styles from "./term-explanation.module.css";

export function TermExplanation({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinned = useRef(false);
  const restoreFocus = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  function cancelClose() { if (timer.current) clearTimeout(timer.current); }
  function show() {
    cancelClose();
    // Keep explanations inside the top layer when their word is in a modal.
    setContainer(trigger.current?.closest<HTMLElement>("dialog, [role='dialog']") ?? null);
    setOpen(true);
  }
  function leave() {
    cancelClose();
    if (!pinned.current) timer.current = setTimeout(() => setOpen(false), 180);
  }
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <Popover.Root open={open} onOpenChange={next => { cancelClose(); pinned.current = next; if (next) show(); else setOpen(false); }}>
    <Popover.Trigger asChild>
      <button ref={trigger} type="button" className={styles.term}
        onPointerEnter={event => { if (event.pointerType === "mouse") show(); }}
        onPointerLeave={leave}
        onClick={event => {
          event.preventDefault();
          restoreFocus.current = true;
          if (pinned.current) { pinned.current = false; setOpen(false); }
          else { pinned.current = true; show(); }
        }}>{term}</button>
    </Popover.Trigger>
    <Popover.Portal container={container}>
      <Popover.Content className={styles.panel} sideOffset={8} collisionPadding={20}
        aria-labelledby={titleId} aria-describedby={descriptionId}
        onOpenAutoFocus={event => event.preventDefault()}
        onCloseAutoFocus={event => {
          event.preventDefault();
          if (restoreFocus.current) trigger.current?.focus({ preventScroll: true });
          restoreFocus.current = false;
        }}
        onPointerEnter={cancelClose} onPointerLeave={leave}>
        <div className={styles.titleRow}><strong id={titleId}>{term}</strong>
          <Popover.Close className={styles.close} aria-label="განმარტების დახურვა"><Icon name="close" /></Popover.Close>
        </div>
        <p id={descriptionId}>{definition}</p>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>;
}
