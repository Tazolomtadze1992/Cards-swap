import Link from "next/link";
import type { CSSProperties } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import styles from "./learning-card.module.css";

type LearningCardProps = {
  item: { id: string; title: string; image: string };
  themeTitle: string;
  color: string;
  eager?: boolean;
  age?: string;
};

export function LearningCard({ item, themeTitle, color, eager = false, age }: LearningCardProps) {
  return <Card asChild className={styles.card} style={{ "--card-color": color } as CSSProperties}>
    <Link id={`topic-${item.id}`} href={age === "6-9" ? "/prototypes/articles?age=6-9" : "/prototypes/articles"} aria-label={`${item.title} — სტატიის გახსნა`}>
      <CardContent className={styles.body}>
        <div className={styles.thumbnail}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" width={1000} height={646} loading={eager ? "eager" : "lazy"} />
        </div>
        <div className={styles.copy}>
          <CardTitle className={styles.title}>{themeTitle}</CardTitle>
          <CardDescription className={styles.description}>{item.title}</CardDescription>
        </div>
      </CardContent>
    </Link>
  </Card>;
}
