"use client";

// Variant 1 — the client's ask taken literally: the full map, laid out left to right,
// scrolling sideways inside the dialog; boxes grow slightly on hover or keyboard focus.
import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/icon";
import { labelText } from "../homepage-prototype/label-text";
import * as map from "./map-data";
import styles from "./map-variants.module.css";

export function MapHorizontal() {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const update = () => setEdges({
      start: element.scrollLeft < 4,
      end: element.scrollLeft + element.clientWidth > element.scrollWidth - 4,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const page = (direction: 1 | -1) => scroller.current?.scrollBy({ left: direction * scroller.current.clientWidth * 0.8, behavior: "smooth" });

  return <div className={styles.hWrap} data-start={edges.start} data-end={edges.end}>
    <div className={styles.hControls}>
      <span className={styles.hint}>{labelText("გადაადგილდი გვერდულად")}</span>
      <button type="button" className={styles.roundButton} onClick={() => page(-1)} disabled={edges.start} aria-label="უკან"><span className={styles.flip}><Icon name="arrowRight" /></span></button>
      <button type="button" className={styles.roundButton} onClick={() => page(1)} disabled={edges.end} aria-label="წინ"><Icon name="arrowRight" /></button>
    </div>
    <div ref={scroller} className={styles.hScroller} tabIndex={0} role="region" aria-label={map.mapTitle} data-own-arrows>
      <ol className={styles.hTrack}>
        <li className={styles.hColumn} data-size="s">
          <Box tone="blue" strong>{map.start}</Box>
        </li>
        <Arrow />
        <li className={styles.hColumn} data-size="m">
          <Box tone="warm" strong>{map.dangerQuestion}</Box>
          <div className={styles.hBranches}>
            <Box tone="danger" tag={map.dangerYes.answer}>{map.dangerYes.text}<small className={styles.jump}>→ პირდაპირ პირველ პასუხზე</small></Box>
            <Box tone="green" tag={map.dangerNo.answer}>{map.dangerNo.text}</Box>
          </div>
        </li>
        <Arrow />
        <li className={styles.hColumn} data-size="l">
          <h4 className={styles.hHeading}>{map.whoTitle}</h4>
          <div className={styles.whoGrid}>
            {map.who.map(item => <Box key={item.title} tone={item.tone} title={item.title}>{item.text}</Box>)}
          </div>
          <p className={styles.note}>{map.whoNote}</p>
        </li>
        <Arrow label={map.anyPath} />
        <li className={styles.hColumn} data-size="m">
          <Box tone="blue" strong>{map.firstResponse}</Box>
          <span className={styles.vArrow} aria-hidden="true" />
          <Box tone="green" strong>{map.assessment}</Box>
        </li>
        <Arrow />
        <li className={styles.hColumn} data-size="m">
          <h4 className={styles.hHeading}>{map.helpTitle}</h4>
          <div className={styles.helpStack}>
            {map.help.map(item => <Box key={item.title} tone={item.tone}>{item.title}</Box>)}
          </div>
        </li>
        <Arrow />
        <li className={styles.hColumn} data-size="s">
          <Box tone="green" strong big>{map.ongoing}</Box>
        </li>
      </ol>
    </div>
    <p className={styles.fallback}><Icon name="alert" />{map.fallback}</p>
  </div>;
}

export function Box({ tone, tag, title, strong, big, children }: { tone: map.Tone; tag?: string; title?: string; strong?: boolean; big?: boolean; children: React.ReactNode }) {
  return <div className={styles.node} data-tone={tone} data-zoom data-big={big || undefined}>
    {tag && <span className={styles.answerTag}>{labelText(tag)}</span>}
    {title && <strong>{title}</strong>}
    {strong ? <strong>{children}</strong> : <p>{children}</p>}
  </div>;
}

function Arrow({ label }: { label?: string }) {
  return <li className={styles.hArrow} aria-hidden="true">
    {label && <span>{label}</span>}
    <Icon name="chevronsRight" />
  </li>;
}
