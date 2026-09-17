"use client";

import * as Popover from "@radix-ui/react-popover";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { filterMotion, useSurfacePresence } from "../motion/surface-motion";
import { useReducedMotion } from "motion/react";
import { Icon } from "./icon";
import styles from "./term-explanation.module.css";

// A shared owner prevents neighbouring terms from retaining overlapping panels.
type ExplanationState = { id: string | null; open: boolean; instant: boolean };
const emptyExplanation: ExplanationState = { id: null, open: false, instant: false };
let explanation = emptyExplanation;
let lastClosed = 0;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const getSnapshot = () => explanation;
const getServerSnapshot = () => emptyExplanation;
function publish(next: ExplanationState) { explanation = next; listeners.forEach(listener => listener()); }
const instantMotion = { enter: 0, exit: 0, from: "none" };
const handoffMotion = { enter: 0, exit: 100, from: "none" };

export function TermExplanation({ term, definition }: { term: string; definition: string }) {
  const ownerId = useId();
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ownsPanel = state.id === ownerId;
  const open = ownsPanel && state.open;
  const reduced = useReducedMotion();
  const { present, attach } = useSurfacePresence(open, reduced ? instantMotion : state.instant ? handoffMotion : filterMotion);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinned = useRef(false);
  const restoreFocus = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  function cancelClose() { if (timer.current) clearTimeout(timer.current); }
  function cancelEntry() { if (entryTimer.current) clearTimeout(entryTimer.current); }
  function close() {
    cancelEntry();
    cancelClose();
    pinned.current = false;
    if (explanation.id === ownerId) {
      lastClosed = Date.now();
      publish({ ...explanation, open: false });
    }
  }
  function show() {
    cancelEntry();
    cancelClose();
    setContainer(trigger.current?.closest<HTMLElement>("dialog, [role='dialog']") ?? null);
    if (explanation.id === ownerId && explanation.open) return;
    publish({ id: ownerId, open: true, instant: explanation.open || Date.now() - lastClosed < 300 });
  }
  function hover() {
    cancelClose();
    cancelEntry();
    if (explanation.open || Date.now() - lastClosed < 300) show();
    else entryTimer.current = setTimeout(show, 120);
  }
  function leave() {
    cancelEntry();
    cancelClose();
    if (!pinned.current) timer.current = setTimeout(close, 120);
  }
  useEffect(() => {
    if (!ownsPanel) {
      pinned.current = false;
      restoreFocus.current = false;
      if (timer.current) clearTimeout(timer.current);
    }
  }, [ownsPanel]);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (entryTimer.current) clearTimeout(entryTimer.current);
    if (explanation.id === ownerId) { lastClosed = Date.now(); publish(emptyExplanation); }
  }, [ownerId]);
  return <Popover.Root open={open} onOpenChange={next => { if (next) { pinned.current = true; show(); } else close(); }}>
    <Popover.Trigger asChild>
      <button ref={trigger} type="button" className={styles.term}
        onPointerEnter={event => { if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) hover(); }}
        onPointerLeave={leave}
        onClick={event => {
          event.preventDefault();
          restoreFocus.current = true;
          if (pinned.current) close();
          else { pinned.current = true; show(); }
        }}>{term}</button>
    </Popover.Trigger>
    {ownsPanel && present && <Popover.Portal forceMount container={container}>
      <Popover.Content forceMount ref={attach} className={styles.panel} sideOffset={8} collisionPadding={20}
        aria-labelledby={titleId} aria-describedby={descriptionId}
        onOpenAutoFocus={event => event.preventDefault()}
        onCloseAutoFocus={event => {
          event.preventDefault();
          if (restoreFocus.current && explanation.id === ownerId) trigger.current?.focus({ preventScroll: true });
          restoreFocus.current = false;
        }}
        onPointerEnter={cancelClose} onPointerLeave={leave}>
        <div className={styles.titleRow}><strong id={titleId}>{term}</strong>
          <Popover.Close className={styles.close} aria-label="განმარტების დახურვა"><Icon name="close" /></Popover.Close>
        </div>
        <p id={descriptionId}>{definition}</p>
      </Popover.Content>
    </Popover.Portal>}
  </Popover.Root>;
}
