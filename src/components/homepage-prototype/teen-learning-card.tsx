import Link from "next/link";
import type { CSSProperties } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { labelText } from "./label-text";
import styles from "./teen-learning-card.module.css";

export function TeenLearningCard({ item, color }: { item: { title: string }; color: string }) {
  return <Card asChild className={styles.card} style={{ "--card-color": color } as CSSProperties}>
    <article>
      <CardContent className={styles.copy}>
        <CardTitle className={styles.title}>{item.title}</CardTitle>
      </CardContent>
      <Link className={styles.start} href="/prototypes/articles" aria-label={`${item.title} — დაწყება`}>{labelText("დაწყება")}</Link>
    </article>
  </Card>;
}
