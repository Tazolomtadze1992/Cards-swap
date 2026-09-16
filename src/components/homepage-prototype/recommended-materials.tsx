"use client";

import { ResourceCard } from "./resource-card";
import type { ResourceItem } from "./resources-data";
import styles from "./recommended-materials.module.css";

export function RecommendedMaterials({ items, onOpen, showHeading = true }: {
  items: ResourceItem[];
  onOpen: (item: ResourceItem, trigger: HTMLButtonElement) => void;
  showHeading?: boolean;
}) {
  return <div className={styles.content}>
    {showHeading && <h2>რეკომენდირებული მასალა</h2>}
    <div className={styles.grid} data-count={items.length}>
      {items.map(item => <ResourceCard context="recommendation" item={item} key={item.id} onOpen={onOpen} />)}
    </div>
  </div>;
}
