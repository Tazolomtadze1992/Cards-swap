"use client";

// The client's map, flowing top to bottom so it reads with the dialog's normal scroll.
// Boxes grow slightly on hover.
import type { ReactNode } from "react";
import { Icon } from "../ui/icon";
import { labelText } from "../homepage-prototype/label-text";
import * as map from "./map-data";
import styles from "./map-variants.module.css";

export function MapVertical() {
  return <div>
    <ol className={styles.vTrack} aria-label={map.mapTitle}>
      <li className={styles.vRow} data-size="s">
        <Box tone="blue" strong>{map.start}</Box>
      </li>
      <Down />
      <li className={styles.vRow} data-size="m">
        <Box tone="warm" strong>{map.dangerQuestion}</Box>
        <div className={styles.vBranches}>
          <Box tone="neutral" tag={map.dangerYes.answer}>{map.dangerYes.text}<small className={styles.jump}>↓ პირდაპირ პირველ პასუხზე</small></Box>
          <Box tone="neutral" tag={map.dangerNo.answer}>{map.dangerNo.text}</Box>
        </div>
      </li>
      <Down />
      <li className={styles.vRow} data-size="l">
        <h4 className={styles.heading}>{map.whoTitle}</h4>
        <div className={styles.vWho}>
          {map.who.map(item => <Box key={item.title} tone={item.tone} title={item.title}>{item.text}</Box>)}
        </div>
        <p className={styles.note}>{map.whoNote}</p>
      </li>
      <Down label={map.anyPath} />
      <li className={styles.vRow} data-size="m">
        <Box tone="blue" strong>{map.firstResponse}</Box>
      </li>
      <Down />
      <li className={styles.vRow} data-size="m">
        <Box tone="green" strong>{map.assessment}</Box>
      </li>
      <Down />
      <li className={styles.vRow} data-size="l">
        <h4 className={styles.heading}>{map.helpTitle}</h4>
        <div className={styles.vHelp}>
          {map.help.map(item => <Box key={item.title} tone={item.tone}>{item.title}</Box>)}
        </div>
      </li>
      <Down />
      <li className={styles.vRow} data-size="s">
        <Box tone="green" strong big>{map.ongoing}</Box>
      </li>
    </ol>
    <p className={styles.fallback}>{map.fallback}</p>
  </div>;
}

function Down({ label }: { label?: string }) {
  return <li className={styles.vArrowRow} aria-hidden="true">
    <span className={styles.vDown}><Icon name="chevronsRight" /></span>
    {label && <span>{label}</span>}
  </li>;
}

function Box({ tone, tag, title, strong, big, children }: { tone: map.Tone; tag?: string; title?: string; strong?: boolean; big?: boolean; children: ReactNode }) {
  return <div className={styles.node} data-tone={tone} data-zoom data-big={big || undefined}>
    {tag && <span className={styles.answerTag}>{labelText(tag)}</span>}
    {title && <strong>{title}</strong>}
    {strong ? <strong>{children}</strong> : <p>{children}</p>}
  </div>;
}
