"use client";

// Variant 2 — "Prezi": one canvas holding all five stages along a path. The overview shows
// the whole route; choosing a stage moves the camera in until that stage fills the frame.
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "../ui/icon";
import { labelText } from "../homepage-prototype/label-text";
import { stages } from "./map-data";
import { StageDetail } from "./stage-detail";
import styles from "./map-variants.module.css";

const FRAME = { w: 720, h: 580 };
const GAP = 120;
// Snake path: 1 2 3 on top, 5 4 underneath (so 3 → 4 drops down, 4 → 5 runs back left).
const slots = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1]] as const;
const CANVAS = { w: 3 * FRAME.w + 2 * GAP, h: 2 * FRAME.h + GAP };
const frameOrigin = (index: number) => ({ x: slots[index][0] * (FRAME.w + GAP), y: slots[index][1] * (FRAME.h + GAP) });

export function MapZoom() {
  const viewport = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [focus, setFocus] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (focus === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setFocus(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus]);

  // Camera: scale and translate so the target rectangle is centred in the viewport.
  const camera = (() => {
    if (!size.w) return { scale: 0, x: 0, y: 0 };
    const target = focus === null
      ? { x: 0, y: 0, w: CANVAS.w, h: CANVAS.h, pad: 0.94 }
      : { ...frameOrigin(focus), w: FRAME.w, h: FRAME.h, pad: 0.96 };
    const scale = Math.min(size.w / target.w, size.h / target.h) * target.pad;
    return { scale, x: size.w / 2 - (target.x + target.w / 2) * scale, y: size.h / 2 - (target.y + target.h / 2) * scale };
  })();

  const centres = stages.map((_, index) => { const o = frameOrigin(index); return [o.x + FRAME.w / 2, o.y + FRAME.h / 2]; });

  return <div className={styles.zoomWrap}>
    <div className={styles.zoomBar}>
      {focus === null
        ? <span className={styles.hint}>{labelText("აირჩიე ეტაპი, რომ მიუახლოვდე")}</span>
        : <button type="button" className={styles.textButton} onClick={() => setFocus(null)}><span className={styles.flip}><Icon name="chevronsRight" /></span>{labelText("მთლიანი რუკა")}</button>}
      <div className={styles.zoomNav}>
        <button type="button" className={styles.roundButton} aria-label="წინა ეტაპი" disabled={focus === 0}
          onClick={() => setFocus(f => f === null ? 0 : Math.max(0, f - 1))}><span className={styles.flip}><Icon name="arrowRight" /></span></button>
        <span className={styles.zoomCount}>{focus === null ? "—" : focus + 1} / {stages.length}</span>
        <button type="button" className={styles.roundButton} aria-label="შემდეგი ეტაპი" disabled={focus === stages.length - 1}
          onClick={() => setFocus(f => f === null ? 0 : Math.min(stages.length - 1, f + 1))}><Icon name="arrowRight" /></button>
      </div>
    </div>
    <div ref={viewport} className={styles.zoomViewport} data-overview={focus === null}>
      <div className={styles.zoomCanvas} style={{
        width: CANVAS.w, height: CANVAS.h,
        transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
        visibility: size.w ? "visible" : "hidden",
      } as CSSProperties}>
        <svg className={styles.zoomPath} width={CANVAS.w} height={CANVAS.h} aria-hidden="true">
          <path d={centres.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")} />
        </svg>
        {stages.map((stage, index) => {
          const o = frameOrigin(index);
          const active = focus === index;
          return <section key={stage.id} className={styles.zoomFrame} data-active={active} data-dim={focus !== null && !active}
            style={{ left: o.x, top: o.y, width: FRAME.w, height: FRAME.h }} aria-label={`${index + 1}. ${stage.short}`}
            inert={focus !== null && !active ? true : undefined}>
            <header className={styles.zoomFrameHead}>
              <span className={styles.bigNumber}>{index + 1}</span>
              <h4>{stage.short}</h4>
            </header>
            <div className={styles.zoomFrameBody} inert={focus === null ? true : undefined}><StageDetail id={stage.id} /></div>
            {focus === null && <button type="button" className={styles.zoomHit} onClick={() => setFocus(index)} aria-label={`${index + 1}. ${stage.short} — მიახლოება`} />}
          </section>;
        })}
      </div>
    </div>
  </div>;
}
