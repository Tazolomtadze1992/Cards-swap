"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "../ui/card";
import type { ResourceItem } from "./resources-data";
import { VideoPlayIndicator } from "./resource-media";
import { labelText } from "./label-text";
import styles from "./resource-card.module.css";

type ResourceCardProps = {
  item: ResourceItem;
  context?: "catalogue" | "recommendation";
  onOpen: (item: ResourceItem, trigger: HTMLButtonElement) => void;
};

function ResourceCardFrame({ item, context = "catalogue", children }: Pick<ResourceCardProps, "item" | "context"> & { children: ReactNode }) {
  return <Card asChild className={styles.card} data-context={context} data-resource-kind={item.video ? "video" : "resource"} style={{ "--card-color": item.color } as CSSProperties}>
    <article id={context === "catalogue" ? `resource-${item.id}` : undefined}>{children}</article>
  </Card>;
}

function ResourceCopy({ item, context }: Pick<ResourceCardProps, "item" | "context">) {
  return <CardContent className={item.video ? styles.videoCopy : styles.copy}>
    <CardTitle className={styles.title} headingLevel={context === "recommendation" ? 3 : 2}>{item.title}</CardTitle>
    <CardDescription>{item.description}</CardDescription>
  </CardContent>;
}

function VideoCard({ item, context, onOpen }: ResourceCardProps) {
  return <ResourceCardFrame item={item} context={context}>
    <CardHeader className={styles.metadata}>
      {item.duration && <Badge>{labelText(item.duration)}</Badge>}
      <Badge>{labelText(item.age)}</Badge>
    </CardHeader>
    <button className={styles.videoPreview} type="button" aria-label={`${item.title} — ვიდეოს ნახვა`} onClick={event => onOpen(item, event.currentTarget)}>
      <Image className={styles.thumbnail} src={`/assets/resources/${item.image}`} width={756} height={504} alt="" />
      <VideoPlayIndicator />
    </button>
    <ResourceCopy item={item} context={context} />
  </ResourceCardFrame>;
}

export function ResourceCard({ item, context = "catalogue", onOpen }: ResourceCardProps) {
  if (item.video) return <VideoCard item={item} context={context} onOpen={onOpen} />;
  return <ResourceCardFrame item={item} context={context}>
    <CardHeader className={styles.metadata}>
      <Image className={styles.documentIcon} src={`/assets/resources/${item.image}`} width={92} height={80} alt="" />
      <Badge>{labelText(item.age)}</Badge>
    </CardHeader>
    <ResourceCopy item={item} context={context} />
    <CardFooter className={styles.action}>
      <Button variant="cardAction" size="resource" fullWidth onClick={event => onOpen(item, event.currentTarget)}>
        {labelText(item.type === "დოკუმენტი" ? "დოკუმენტის გადმოწერა" : "რესურსის ნახვა")}
        {item.type === "დოკუმენტი" && <Icon name="download" />}
      </Button>
    </CardFooter>
  </ResourceCardFrame>;
}
