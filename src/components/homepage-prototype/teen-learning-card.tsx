import Link from "next/link";
import type { CSSProperties } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { labelText } from "./label-text";
import styles from "./teen-learning-card.module.css";

export function TeenLearningCard({ item, themeTitle, color }: { item: { title: string }; themeTitle: string; color: string }) {
  return <Card asChild className={styles.card} style={{ "--card-color": color } as CSSProperties}>
    <article>
      <CardContent className={styles.copy}>
        <CardTitle className={styles.title}>{themeTitle}</CardTitle>
        <CardDescription className={styles.description}>{item.title}</CardDescription>
      </CardContent>
      <Link className={styles.start} href="/prototypes/articles" aria-label={`${item.title} — დაწყება`}>{labelText("დაწყება")}</Link>
    </article>
  </Card>;
}
