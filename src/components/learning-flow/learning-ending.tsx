"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ActionRow } from "../ui/action-row";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { RecommendedMaterials } from "../homepage-prototype/recommended-materials";
import { Separator } from "../ui/separator";
import { resources, type ResourceItem } from "../homepage-prototype/resources-data";
import { labelText } from "../homepage-prototype/label-text";
import type { LearningActivity } from "./learning-content";
import styles from "./learning-flow.module.css";

// Existing article/catalogue fixtures for design review; CMS recommendations are not mapped yet.
const previewMaterials = [resources[0], resources[3]];

export function LearningEnding({ activity, answers, skipped, heading, onReview, young = false }: {
  young?: boolean;
  activity: LearningActivity; answers: Record<string, number>; skipped: boolean;
  heading: RefObject<HTMLHeadingElement | null>; onReview: () => void;
}) {
  const correct = activity.items.filter(item => answers[item.id] === item.correctIndex).length;
  const total = activity.items.length;
  const [preview, setPreview] = useState<ResourceItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (preview) dialog.current?.showModal(); }, [preview]);
  const nextHref = activity.kind === "scenario" ? `/prototypes/learning/practice/quiz${young ? "?age=6-9" : ""}` : young ? "/prototypes/learning/6-9" : "/prototypes/learning";
  return <section className={styles.ending}>
    <div className={styles.resultContent}>
    {skipped && <h1 className={styles.endingTitle} ref={heading} tabIndex={-1}>რეკომენდირებული მასალა</h1>}
    {!skipped && <div className={styles.result}>
      <h1 ref={heading} tabIndex={-1}>{correct === total ? "ყველა პასუხი სწორია!" : "კარგია, რომ ივარჯიშე!"}</h1>
      <div className={styles.score}>
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle className={styles.scoreTrack} cx="60" cy="60" r="52" /><circle className={styles.scoreFill} cx="60" cy="60" r="52" pathLength="100" strokeDasharray={`${correct / total * 100} 100`} transform="rotate(-90 60 60)" /></svg>
        <p><strong>{correct} / {total}</strong><span>სწორი პასუხი</span></p>
      </div>
    </div>}
    <p className={styles.takeaway}>{activity.recommendation}</p>
    <div className={styles.resultDivider}><Separator /></div>
    </div>
    <section className={styles.materials} aria-label="რეკომენდირებული მასალა">
      <RecommendedMaterials items={previewMaterials} onOpen={setPreview} showHeading={!skipped} />
    </section>
    <ActionRow spacing="airy">
      <Button variant="subtle" onClick={onReview}>{labelText("სწორი პასუხების ნახვა")}</Button>
      <Button asChild><Link href={nextHref}>{labelText(activity.kind === "scenario" ? "ქვიზზე გადასვლა" : "სწავლის გვერდზე დაბრუნება")}<Icon name="chevronsRight" /></Link></Button>
    </ActionRow>
    <dialog ref={dialog} className={styles.materialPreview} aria-labelledby="material-preview-title" onClose={() => setPreview(null)}>
      {preview && <><div className={styles.previewClose}><Button variant="subtle" size="icon" aria-label="დახურვა" onClick={() => dialog.current?.close()}><Icon name="close" /></Button></div>
        <Image className={styles.previewImage} src={`/assets/resources/${preview.image}`} width={preview.video ? 756 : 92} height={preview.video ? 504 : 80} alt="" />
        <h2 id="material-preview-title">{preview.title}</h2><p>{preview.description}</p><p className={styles.previewNote}>{preview.video ? "ვიდეო" : "ჩამოსატვირთი ფაილი"} საბოლოო კონტენტთან ერთად დაემატება.</p></>}
    </dialog>
  </section>;
}
