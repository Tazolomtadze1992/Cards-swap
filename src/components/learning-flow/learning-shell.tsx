import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "../homepage-prototype/site-header";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Icon } from "../ui/icon";
import styles from "./learning-flow.module.css";

export function LearningShell({ children, kind, current, total, stage, young = false, onCloseReview }: {
  young?: boolean;
  children: ReactNode; kind: "quiz" | "scenario";
  current: number; total: number; stage: "answer" | "recommendation" | "review-index" | "review";
  onCloseReview: () => void;
}) {
  const progressLabel = stage === "recommendation" ? "რეკომენდაცია" : `${stage === "review" ? "პასუხების მიმოხილვა" : kind === "quiz" ? "კითხვა" : "ნაბიჯი"} ${current} / ${total}`;
  return <div className={styles.page}>
    <SiteHeader activeItem="learning" />
    <main className={styles.shell} data-stage={stage}>
      {stage !== "recommendation" && <><div className={styles.topbar}>
        <div className={styles.progressGroup}>
          {(stage === "answer" || stage === "review") && <><span className={styles.progressCount} aria-live="polite">{progressLabel}</span>
          <progress className={styles.progress} max={total} value={current} aria-label={progressLabel} /></>}
        </div>
        {stage === "review" ? <Button variant="subtle" size="icon" aria-label="ყველა პასუხზე დაბრუნება" onClick={onCloseReview}><Icon name="close" /></Button> : <Button asChild variant="subtle" size="icon"><Link href={young ? "/prototypes/learning/6-9" : "/prototypes/learning"} aria-label="სწავლის გვერდზე დაბრუნება"><Icon name="close" /></Link></Button>}
      </div>
      <div className={styles.topDivider}><Separator /></div></>}
      {children}
    </main>
  </div>;
}
