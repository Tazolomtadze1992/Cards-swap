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
// Topic index → quiz score out of 10 (fixture).
const completed = new Map<number, number>([[0, 9], [2, 7], [5, 10]]);

export const variants = [
  { name: "Sticker", note: "The quiz-review check sticker sits on the illustration. Card colours stay untouched." },
  { name: "Sticker + dimmed", note: "Same sticker; frame and illustration fade back so unfinished topics lead." },
  { name: "Badge under title", note: "Shared Badge pill with check and label, in accent blue. No dimming." },
  { name: "Success pill on image", note: "Green success token pill on the illustration corner, card slightly dimmed." },
  { name: "Muted card", note: "Frame turns neutral, illustration desaturates. Strongest ‘done’ signal." },
  { name: "Image scrim", note: "Cream veil over the illustration with a centred check. Hover shows “do again”." },
  { name: "Result row", note: "Footer row with check and the quiz score. Keeps colour, adds information." },
  { name: "Grouped at end", note: "Progress line on top; finished topics move to their own dimmed section below." },
] as const;

type Topic = (typeof learningTopics10to13)[number];

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

  const topics = learningTopics10to13.map((item, index) => ({ item, index, score: completed.get(index) }));
  const grouped = variant === 8;
  const open = grouped ? topics.filter(t => t.score === undefined) : topics;
  const done = grouped ? topics.filter(t => t.score !== undefined) : [];
  const renderCard = ({ item, index, score }: { item: Topic; index: number; score?: number }) =>
    <TopicCard key={item.id} item={item} color={colors[index % colors.length]} eager={index < 3} variant={variant} score={score} />;

  return <main className={page.page}>
    <SiteHeader activeItem="learning" />
    <section className={`${page.content} ${styles.content}`}>
      <div className={page.intro}>
        <h1>აირჩიე თემა და დაიწყე</h1>
        <p>იმისთვის, რომ დაგიცვათ, ჩვენ არ ვინახავთ შენს მონაცემებს. ამიტომ როგორც კი სწავლის პროცესს შეწყვეტ, შენი მონაცემები წაიშლება</p>
      </div>
      <div className={styles.countRow}>
        {grouped && <Progress done={completed.size} total={topics.length} />}
        <p className={page.count}>{labelText("ნაჩვენებია : ")}<strong>{labelText(`${topics.length} სტატია`)}</strong></p>
      </div>
      <div className={page.divider}><Separator /></div>
      <div className={page.grid}>{open.map(renderCard)}</div>
      {grouped && <>
        <h2 className={styles.groupHeading}>დასრულებული თემები</h2>
        <div className={page.grid}>{done.map(renderCard)}</div>
      </>}
    </section>
    <VariantSwitcher value={variant} onChange={setVariant} />
  </main>;
}

function Progress({ done, total }: { done: number; total: number }) {
  return <div className={styles.progress}>
    <span className={styles.progressLabel}>{labelText(`დასრულებულია ${done} / ${total}`)}</span>
    <span className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${(done / total) * 100}%` }} /></span>
  </div>;
}

function TopicCard({ item, color, eager, variant, score }: { item: Topic; color: string; eager: boolean; variant: number; score?: number }) {
  const isDone = score !== undefined;
  const v = isDone ? variant : 0;
  const cls = [base.card, styles.card, isDone && styles[`v${v}`]].filter(Boolean).join(" ");
  return <Card asChild className={cls} style={{ "--card-color": color } as CSSProperties}>
    <Link href="/prototypes/articles" aria-label={`${item.title}${isDone ? " — დასრულებულია, თავიდან გავლა" : " — სტატიის გახსნა"}`}>
      <CardContent className={base.body}>
        <div className={base.thumbnail}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" width={1000} height={646} loading={eager ? "eager" : "lazy"} />
          {(v === 1 || v === 2 || v === 8) && <Image className={styles.sticker} src="/assets/learning/review-check.svg" width={44} height={51} alt="" />}
          {v === 4 && <span className={styles.successPill}><Icon name="check" />{labelText("გავლილია")}</span>}
          {v === 6 && <span className={styles.scrim} aria-hidden="true">
            <span className={styles.scrimCheck}><Icon name="check" size="large" /></span>
            <span className={styles.scrimLabel}>
              <span className={styles.scrimIdle}>{labelText("დასრულებულია")}</span>
              <span className={styles.scrimHover}>{labelText("თავიდან გავლა")}</span>
            </span>
          </span>}
        </div>
        <div className={`${base.copy} ${styles.copy}`}>
          <CardTitle className={base.title}>{item.title}</CardTitle>
          {(v === 3 || v === 5) && <span className={styles.badge}><Icon name="check" />{labelText("დასრულებულია")}</span>}
          {v === 7 && <div className={styles.resultRow}>
            <span className={styles.resultDone}><Icon name="check" />{labelText("დასრულებულია")}</span>
            <span className={styles.resultScore}>{labelText(`${score}/10 სწორი`)}</span>
          </div>}
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
        {variants.map((item, index) => <button key={item.name} type="button" role="radio" aria-checked={value === index + 1}
          aria-label={`${index + 1}. ${item.name}`} title={item.name} onClick={() => onChange(index + 1)}>{index + 1}</button>)}
      </div>
      <button type="button" className={styles.arrow} onClick={next} aria-label="Next variant"><Icon name="arrowRight" /></button>
    </div>
  </nav>;
}
