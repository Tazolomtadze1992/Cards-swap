import Link from "next/link";
import type { CSSProperties } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import styles from "./learning-card.module.css";

type LearningCardProps = {
  item: { id: string; title: string; image: string };
  color: string;
  eager?: boolean;
  age?: string;
  /** Topic the child has already finished: the card fades back so unfinished topics lead. */
  completed?: boolean;
};

export function LearningCard({ item, color, eager = false, age, completed = false }: LearningCardProps) {
  return <Card asChild className={styles.card} data-completed={completed || undefined} style={{ "--card-color": color } as CSSProperties}>
    <Link id={`topic-${item.id}`} href={age === "6-9" ? "/prototypes/articles?age=6-9" : "/prototypes/articles"} aria-label={`${item.title} — ${completed ? "დასრულებულია, თავიდან გავლა" : "სტატიის გახსნა"}`}>
      <CardContent className={styles.body}>
        <div className={styles.thumbnail}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" width={1000} height={646} loading={eager ? "eager" : "lazy"} />
        </div>
        <div className={styles.copy}>
          <CardTitle className={styles.title}>{item.title}</CardTitle>
        </div>
      </CardContent>
    </Link>
  </Card>;
}
