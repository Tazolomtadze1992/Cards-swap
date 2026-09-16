import Link from "next/link";
import type { CSSProperties } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { ButtonSurface } from "../ui/button";
import { labelText } from "./label-text";
import styles from "./learning-card.module.css";

type LearningCardProps = {
  item: { id: string; title: string; image: string };
  appearance: "framed" | "filled";
  color: string;
  eager?: boolean;
  age?: string;
};

export function LearningCard({ item, appearance, color, eager = false, age }: LearningCardProps) {
  return <Card asChild className={styles.card} data-appearance={appearance} style={{ "--card-color": color } as CSSProperties}>
    <Link href={age === "6-9" ? "/prototypes/articles?age=6-9" : "/prototypes/articles"} aria-label={`${item.title} — სტატიის გახსნა`}>
      <CardContent className={styles.body}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" width={1000} height={646} loading={eager ? "eager" : "lazy"} />
        <CardTitle className={styles.title}>{item.title}</CardTitle>
      </CardContent>
      {appearance === "filled" && <ButtonSurface>{labelText("დაწყება")}</ButtonSurface>}
    </Link>
  </Card>;
}
