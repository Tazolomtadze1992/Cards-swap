"use client";

// Design exploration: how a finished topic reads when a child returns to
// სწავლა და პრაქტიკა. Not wired to real progress — completed ids are fixtures.
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Icon } from "../ui/icon";
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
  const [variant, setVariant] = useState(Math.min(Math.max(initialVariant, 1), variants.length));

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(variant));
    window.history.replaceState(null, "", url);
  }, [variant]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select")) return;
      if (event.key === "ArrowRight") setVariant(v => v % variants.length + 1);
      if (event.key === "ArrowLeft") setVariant(v => (v + variants.length - 2) % variants.length + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <VariantSwitcher value={variant} onChange={setVariant} />
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

function VariantSwitcher({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const current = variants[value - 1];
  const prev = () => onChange((value + variants.length - 2) % variants.length + 1);
  const next = () => onChange(value % variants.length + 1);
  return <nav className={styles.switcher} aria-label="Completed-topic variants">
    <div className={styles.switcherInfo}>
      <strong>{value}. {current.name}</strong>
      <span>{current.note}</span>
    </div>
    <div className={styles.switcherControls}>
      <button type="button" className={styles.arrow} onClick={prev} aria-label="Previous variant"><span className={styles.flip}><Icon name="arrowRight" /></span></button>
      <div className={styles.numbers} role="radiogroup" aria-label="Variant">
        {variants.map((item, index) => <button key={item.id} type="button" role="radio" aria-checked={value === index + 1}
          aria-label={`${index + 1}. ${item.name}`} title={item.name} onClick={() => onChange(index + 1)}>{index + 1}</button>)}
      </div>
      <button type="button" className={styles.arrow} onClick={next} aria-label="Next variant"><Icon name="arrowRight" /></button>
    </div>
  </nav>;
}
