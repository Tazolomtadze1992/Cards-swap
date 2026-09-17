"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const surfaceEase = "cubic-bezier(0.25, 1, 0.5, 1)";
export function keyboardInteraction() {
  return document.documentElement.dataset.inputMode === "keyboard";
}

export function MotionInput() {
  useEffect(() => {
    const keyboard = () => { document.documentElement.dataset.inputMode = "keyboard"; };
    const pointer = () => { document.documentElement.dataset.inputMode = "pointer"; };
    document.addEventListener("keydown", keyboard, true);
    document.addEventListener("pointerdown", pointer, true);
    return () => {
      document.removeEventListener("keydown", keyboard, true);
      document.removeEventListener("pointerdown", pointer, true);
    };
  }, []);
  return null;
}

type SurfaceOptions = { enter: number; exit: number; from: string };
export const dialogMotion = { enter: 200, exit: 150, from: "scale(.98)" };
export const filterMotion = { enter: 150, exit: 100, from: "scale(.97)" };
export const menuMotion = { enter: 220, exit: 160, from: "translateY(-8px)" };

// Freeze the current visual state when interrupted, so reversal never restarts.
export function animateSurface(element: HTMLElement, open: boolean, options: SurfaceOptions, fresh = false) {
  return animateSurfaceGroup(element, open, options, fresh, false);
}

// A native backdrop is a separate rendered surface; fading the dialog alone
// leaves the page dimmed until close() removes it from the top layer.
export function animateNativeDialog(element: HTMLDialogElement, open: boolean, options: SurfaceOptions, fresh = false) {
  return animateSurfaceGroup(element, open, options, fresh, true);
}

function animateSurfaceGroup(element: HTMLElement, open: boolean, options: SurfaceOptions, fresh: boolean, nativeDialog: boolean) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const still = keyboardInteraction();
  let backdropEffect: KeyframeEffect | null = null;
  if (nativeDialog) {
    try {
      backdropEffect = new KeyframeEffect(element, [
        { opacity: fresh && open ? "0" : getComputedStyle(element, "::backdrop").opacity },
        { opacity: open ? "1" : "0" },
      ], { pseudoElement: "::backdrop" });
      // Some engines ignore unsupported options instead of throwing.
      if (backdropEffect.pseudoElement !== "::backdrop") backdropEffect = null;
    } catch { /* Unsupported engines dismiss both surfaces immediately. */ }
  }
  const duration = still || (nativeDialog && !backdropEffect) ? 0 : reduced.matches ? Math.min(120, open ? options.enter : options.exit) : open ? options.enter : options.exit;
  const current = getComputedStyle(element);
  const target = { opacity: open ? "1" : "0", transform: reduced.matches || open ? "none" : options.from };
  const timing = { duration, easing: surfaceEase, fill: "both" } satisfies KeyframeAnimationOptions;
  const animation = element.animate([
    fresh && open ? { opacity: "0", transform: reduced.matches ? "none" : options.from } : { opacity: current.opacity, transform: current.transform },
    target,
  ], timing);
  const backdrop = backdropEffect ? new Animation(backdropEffect, document.timeline) : null;
  if (backdrop) {
    backdropEffect!.updateTiming(timing);
    backdrop.play();
    // Use one timeline position, including on reversals during entry.
    animation.startTime = backdrop.startTime = document.timeline.currentTime;
  }
  const animations = backdrop ? [animation, backdrop] : [animation];
  const finishImmediately = () => animations.forEach(item => item.finish());
  reduced.addEventListener("change", finishImmediately);
  // A keyboard command during an opening transition must not wait for it.
  document.addEventListener("keydown", finishImmediately, { once: true, capture: true });
  const finished = Promise.all(animations.map(item => item.finished));
  // Entrance-only callers need not await completion; cancellation still rejects
  // for callers that do await it, without becoming an unhandled rejection.
  void finished.catch(() => {});
  return {
    finished,
    cancel() {
      reduced.removeEventListener("change", finishImmediately);
      document.removeEventListener("keydown", finishImmediately, true);
      if (backdrop) {
        // commitStyles is not supported for pseudo-elements. Freeze its visual
        // opacity through CSS before cancelling so a reversal starts here.
        element.style.setProperty("--dialog-backdrop-opacity", getComputedStyle(element, "::backdrop").opacity);
        backdrop.cancel();
      }
      try { animation.commitStyles(); } catch { /* The surface may already be detached. */ }
      animation.cancel();
    },
  };
}

// Keep a closing surface mounted until its transition finishes. Radix continues
// to own focus, dismissal and keyboard behavior; this hook only owns presence.
export function useSurfacePresence(open: boolean, options: SurfaceOptions, viewport?: string) {
  const [retained, setRetained] = useState(open);
  const [lastOpen, setLastOpen] = useState(open);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const seen = useRef<HTMLElement | null>(null);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) setRetained(true);
  }
  const present = open || retained;
  useLayoutEffect(() => {
    if (!node) return;
    if (!present) {
      seen.current = null;
      node.style.removeProperty("opacity");
      node.style.removeProperty("transform");
      return;
    }
    const finish = () => { if (!open) setRetained(false); };
    if (viewport && !window.matchMedia(viewport).matches) {
      queueMicrotask(finish);
      return;
    }
    const animation = animateSurface(node, open, options, seen.current !== node);
    seen.current = node;
    let active = true;
    animation.finished.then(() => { if (active) finish(); }, () => {});
    return () => { active = false; animation.cancel(); };
  }, [node, open, present, options, viewport]);
  return { present, attach: setNode };
}
