"use client";

// Design exploration: how a finished topic reads when a child returns to
// სწავლა და პრაქტიკა. Not wired to real progress — completed ids are fixtures.
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Icon } from "../ui/icon";
import { VariantSwitcher, useVariant } from "../prototype-tools/variant-switcher";
import { Separator } from "../ui/separator";
import { SiteHeader } from "../homepage-prototype/site-header";
import { learningTopics10to13 } from "../homepage-prototype/learning-data-10-13";
import { labelText } from "../homepage-prototype/label-text";
import page from "../homepage-prototype/learning.module.css";
import base from "../homepage-prototype/learning-card.module.css";
import styles from "./completed-variants.module.css";

const colors = ["#FFC800", "#58CC02", "#1CB0F6", "#00CD9C", "#CE82FF"];
const completed = new Set([0, 2, 5]);

const variants = [
  { id: "sticker", name: "Sticker", note: "Green check sticker on the illustration. Card colours stay untouched." },
  { id: "dimmed", name: "Sticker + dimmed", note: "Same sticker; frame and illustration fade back so unfinished topics lead." },
  { id: "scrim", name: "Image scrim", note: "Cream veil over the illustration with a centred check. Hover shows “do again”." },
] as const;
type VariantId = (typeof variants)[number]["id"];

export default function CompletedVariantsPage({ initialVariant = 1 }: { initialVariant?: number }) {
  const [variant, setVariant] = useVariant(variants.length, initialVariant);

  const variantId = variants[variant - 1].id;

  return <main className={page.page}>
    <SiteHeader activeItem="learning" />
    <section className={`${page.content} ${styles.content}`}>
      <div className={page.intro}>
        <h1>აირჩიე თემა და დაიწყე</h1>
        <p>იმისთვის, რომ დაგიცვათ, ჩვენ არ ვინახავთ შენს მონაცემებს. ამიტომ როგორც კი სწავლის პროცესს შეწყვეტ, შენი მონაცემები წაიშლება</p>
      </div>
      <div className={styles.countRow}>
        <p className={page.count}>{labelText("ნაჩვენებია : ")}<strong>{labelText(`${learningTopics10to13.length} სტატია`)}</strong></p>
      </div>
      <div className={page.divider}><Separator /></div>
      <div className={page.grid}>
        {learningTopics10to13.map((item, index) => <TopicCard key={item.id} item={item} color={colors[index % colors.length]}
          eager={index < 3} variant={completed.has(index) ? variantId : undefined} />)}
      </div>
    </section>
    <VariantSwitcher variants={variants} value={variant} onChange={setVariant} label="Completed-topic variants" />
  </main>;
}

function TopicCard({ item, color, eager, variant }: { item: (typeof learningTopics10to13)[number]; color: string; eager: boolean; variant?: VariantId }) {
  const cls = [base.card, styles.card, variant === "dimmed" && styles.dimmedCard].filter(Boolean).join(" ");
  return <Card asChild className={cls} style={{ "--card-color": color } as CSSProperties}>
    <Link href="/prototypes/articles" aria-label={`${item.title}${variant ? " — დასრულებულია, თავიდან გავლა" : " — სტატიის გახსნა"}`}>
      <CardContent className={base.body}>
        <div className={base.thumbnail}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" width={1000} height={646} loading={eager ? "eager" : "lazy"} />
          {(variant === "sticker" || variant === "dimmed") && <Image className={styles.sticker} src="/assets/learning/completed-check.svg" width={44} height={51} alt="" />}
          {variant === "scrim" && <span className={styles.scrim} aria-hidden="true">
            <span className={styles.scrimCheck}><Icon name="check" size="large" /></span>
            <span className={styles.scrimLabel}>
              <span className={styles.scrimIdle}>{labelText("დასრულებულია")}</span>
              <span className={styles.scrimHover}>{labelText("თავიდან გავლა")}</span>
            </span>
          </span>}
        </div>
        <div className={`${base.copy} ${styles.copy}`}>
          <CardTitle className={base.title}>{item.title}</CardTitle>
        </div>
      </CardContent>
    </Link>
  </Card>;
}
