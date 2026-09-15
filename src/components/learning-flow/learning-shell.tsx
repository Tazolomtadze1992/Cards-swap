import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "../homepage-prototype/site-header";
import { labelText } from "../homepage-prototype/label-text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import styles from "./learning-flow.module.css";

export function LearningShell({ children, kind, title, current, total, stage }: {
  children: ReactNode; kind: "quiz" | "scenario"; title: string;
  current: number; total: number; stage: "answer" | "recommendation" | "review";
}) {
  const progressLabel = stage === "recommendation" ? "რეკომენდაცია" : `${stage === "review" ? "პასუხების მიმოხილვა" : kind === "quiz" ? "კითხვა" : "ნაბიჯი"} ${current} / ${total}`;
  return <div className={styles.page}>
    <SiteHeader activeItem="learning" />
    <main className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.meta}><Badge>{labelText("10–13 წელი")}</Badge><span>{labelText(kind === "quiz" ? "ქვიზი" : "სცენარი")}</span></div>
        <Button asChild variant="subtle" size="icon"><Link href="/prototypes/learning/practice" aria-label="პრაქტიკის არჩევაზე დაბრუნება"><Icon name="close" /></Link></Button>
      </div>
      <div className={styles.progressHeading}><span>{title}</span><span aria-live="polite">{labelText(progressLabel)}</span></div>
      {stage !== "recommendation" && <progress className={styles.progress} max={total} value={current} aria-label={progressLabel} />}
      {children}
      <div className={styles.help}><span>დახმარება გჭირდება?</span><Button asChild variant="subtle" size="compact"><Link href="/prototypes/faq">{labelText("როგორ მოვითხოვო დახმარება")}<Icon name="chevronsRight" /></Link></Button></div>
    </main>
  </div>;
}
