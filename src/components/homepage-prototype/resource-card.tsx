"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { ResourceItem } from "./resources-data";
import { labelText } from "./label-text";
import styles from "./resources.module.css";

type ResourceCardProps = {
  item: ResourceItem;
  className?: string;
  onOpen: (item: ResourceItem, trigger: HTMLButtonElement) => void;
};

export function ResourceCard({ item, className, onOpen }: ResourceCardProps) {
  return <article className={`${styles.card}${className ? ` ${className}` : ""}`} style={{ "--card-color": item.color } as CSSProperties}>
    {item.video ? <>
      <div className={styles.videoMeta}>
        <span className={styles.durationPill}>{labelText(item.duration ?? "")}</span>
        <span className={styles.agePill}>{labelText(item.age)}</span>
      </div>
      <button className={styles.videoPreview} type="button" aria-label={`${item.title} — ვიდეოს ნახვა`} onClick={event => onOpen(item, event.currentTarget)}>
        <Image className={styles.thumbnail} src={`/assets/resources/${item.image}`} width={756} height={504} alt="" />
        <span className={styles.play}><Image src="/assets/resources/play.svg" width={24} height={24} alt="" /></span>
      </button>
    </> : <div className={styles.cardTop}>
      <Image className={styles.documentIcon} src={`/assets/resources/${item.image}`} width={92} height={80} alt="" />
      <span className={styles.agePill}>{labelText(item.age)}</span>
    </div>}
    <div className={item.video ? styles.videoCopy : styles.copy}><h2>{item.title}</h2><p>{item.description}</p></div>
    {!item.video && <button className={styles.download} type="button" onClick={event => onOpen(item, event.currentTarget)}>{labelText(item.type === "დოკუმენტი" ? "დოკუმენტის გადმოწერა" : "რესურსის ნახვა")}{item.type === "დოკუმენტი" && <Image src="/assets/resources/download.svg" width={24} height={24} alt="" />}</button>}
  </article>;
}
