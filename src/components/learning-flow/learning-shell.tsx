import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "../homepage-prototype/site-header";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Icon } from "../ui/icon";
import styles from "./learning-flow.module.css";

export function LearningShell({ children, kind, current, total, stage, layout, onLayoutChange }: {
  children: ReactNode; kind: "quiz" | "scenario";
  current: number; total: number; stage: "answer" | "recommendation" | "review-index" | "review";
  layout: "open" | "contained"; onLayoutChange: (layout: "open" | "contained") => void;
}) {
  const progressLabel = stage === "recommendation" ? "რეკომენდაცია" : `${stage === "review" ? "პასუხების მიმოხილვა" : kind === "quiz" ? "კითხვა" : "ნაბიჯი"} ${current} / ${total}`;
  return <div className={styles.page}>
    <SiteHeader activeItem="learning" logoAccessory={<div className={styles.layoutPicker} role="group" aria-label="დიზაინის ვარიანტი">
      <button type="button" aria-pressed={layout === "open"} onClick={() => onLayoutChange("open")}>ღია</button>
      <button type="button" aria-pressed={layout === "contained"} onClick={() => onLayoutChange("contained")}>ჩარჩოში</button>
    </div>} />
    <main className={styles.shell} data-layout={layout} data-stage={stage}>
      {stage !== "recommendation" && <><div className={styles.topbar}>
        <div className={styles.progressGroup}>
          {(stage === "answer" || stage === "review") && <><span className={styles.progressCount} aria-live="polite">{progressLabel}</span>
          <progress className={styles.progress} max={total} value={current} aria-label={progressLabel} /></>}
        </div>
        <Button asChild variant="subtle" size="icon"><Link href="/prototypes/learning" aria-label="სწავლის გვერდზე დაბრუნება"><Icon name="close" /></Link></Button>
      </div>
      <div className={styles.topDivider}><Separator /></div></>}
      {children}
    </main>
  </div>;
}
