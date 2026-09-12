"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DirectoryVariant } from "./directory";
import { MapFirstVariant } from "./map-first";
import { QuietVariant } from "./quiet";
import styles from "./services-prototype.module.css";

const variants = [
  { name: "მშვიდი", component: QuietVariant },
  { name: "კონტაქტები", component: DirectoryVariant },
  { name: "რუკა", component: MapFirstVariant },
] as const;

export function ServicesPrototype() {
  const [current, setCurrent] = useState(0);
  const [mountKey, setMountKey] = useState(0);
  const [ready, setReady] = useState(false);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  function setActive(index: number) {
    if (index < 0 || index >= variants.length) return;
    setCurrent(index);
    setMountKey((key) => key + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(null, "", url);
  }

  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("v") ?? "1") - 1;
    if (requested >= 0 && requested < variants.length) setCurrent(requested);
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= variants.length) setActive(number - 1);
      else if (event.key === "ArrowRight") setActive((current + 1) % variants.length);
      else if (event.key === "ArrowLeft") setActive((current - 1 + variants.length) % variants.length);
      else if (event.key === "r" || event.key === "R") setMountKey((key) => key + 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [current]);

  useLayoutEffect(() => {
    function moveHighlight() {
      const picker = pickerRef.current;
      const highlight = highlightRef.current;
      if (!picker || !highlight) return;
      const items = picker.querySelectorAll<HTMLButtonElement>(".proto-picker-item:not(.proto-picker-replay)");
      const item = items[current];
      if (!item) return;
      highlight.style.width = `${item.offsetWidth}px`;
      highlight.style.transform = `translateX(${item.offsetLeft}px)`;
    }
    moveHighlight();
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  }, [current]);

  const CurrentVariant = variants[current].component;

  return (
    <div className={styles.harness}>
      <div key={mountKey}><CurrentVariant /></div>
      <nav ref={pickerRef} className="proto-picker" aria-label="Prototype variants" data-ready={ready || undefined} data-position="top">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true"></span>
        {variants.map((variant, index) => (
          <button
            key={variant.name}
            className="proto-picker-item"
            data-active={current === index || undefined}
            aria-current={current === index ? "true" : undefined}
            onClick={() => setActive(index)}
          >
            {variant.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true"></span>
        <button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setMountKey((key) => key + 1)}>↻</button>
      </nav>
      <span className={styles.srOnly} aria-live="polite">არჩეულია {variants[current].name}</span>
    </div>
  );
}
