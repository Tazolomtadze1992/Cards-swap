"use client";

// Prototype review tool, not product UI: pick between design variants on one page.
// Keeps the choice in ?v= so a specific variant can be shared, and supports ← →.
import { useEffect, useState } from "react";
import { Icon } from "../ui/icon";
import styles from "./variant-switcher.module.css";

export type VariantInfo = { name: string; note: string };

export function useVariant(count: number, initial = 1) {
  const [variant, setVariant] = useState(Math.min(Math.max(initial, 1), count));
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(variant));
    window.history.replaceState(null, "", url);
  }, [variant]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, [data-own-arrows]")) return;
      if (event.key === "ArrowRight") setVariant(v => v % count + 1);
      if (event.key === "ArrowLeft") setVariant(v => (v + count - 2) % count + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);
  return [variant, setVariant] as const;
}

export function VariantSwitcher({ variants, value, onChange, label = "Design variants" }: {
  variants: readonly VariantInfo[]; value: number; onChange: (v: number) => void; label?: string;
}) {
  const count = variants.length;
  const current = variants[value - 1];
  return <nav className={styles.switcher} aria-label={label}>
    <div className={styles.info}>
      <strong>{value}. {current.name}</strong>
      <span>{current.note}</span>
    </div>
    <div className={styles.controls}>
      <button type="button" className={styles.arrow} onClick={() => onChange((value + count - 2) % count + 1)} aria-label="Previous variant"><span className={styles.flip}><Icon name="arrowRight" /></span></button>
      <div className={styles.numbers} role="radiogroup" aria-label="Variant">
        {variants.map((item, index) => <button key={item.name} type="button" role="radio" aria-checked={value === index + 1}
          aria-label={`${index + 1}. ${item.name}`} title={item.name} onClick={() => onChange(index + 1)}>{index + 1}</button>)}
      </div>
      <button type="button" className={styles.arrow} onClick={() => onChange(value % count + 1)} aria-label="Next variant"><Icon name="arrowRight" /></button>
    </div>
  </nav>;
}
