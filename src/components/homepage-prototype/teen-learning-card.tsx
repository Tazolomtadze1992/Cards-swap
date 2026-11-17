import Link from "next/link";
import type { CSSProperties } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { labelText } from "./label-text";
import { startTopic } from "./learning-progress";
import styles from "./teen-learning-card.module.css";

export function TeenLearningCard({ item, color, completed = false }: { item: { id: string; title: string }; color: string; completed?: boolean }) {
  return <Card asChild className={styles.card} data-completed={completed || undefined} style={{ "--card-color": color } as CSSProperties}>
    <article>
      <CardContent className={styles.copy}>
        <CardTitle className={styles.title}>{item.title}</CardTitle>
      </CardContent>
      <Link className={styles.start} href="/prototypes/articles" aria-label={`${item.title} — ${completed ? "დასრულებულია, თავიდან გავლა" : "დაწყება"}`} onClick={() => startTopic(item.id)}>{labelText("დაწყება")}</Link>
    </article>
  </Card>;
}
