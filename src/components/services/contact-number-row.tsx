"use client";

import { useEffect, useRef, useState } from "react";
import { TextMorph } from "torph/react";
import { useReducedMotion } from "motion/react";
import { keyboardInteraction } from "../motion/surface-motion";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { labelText } from "../homepage-prototype/label-text";
import styles from "./contact-number-row.module.css";

export type ContactNumber = { number: string; tel: string; label: string };

type CopyState = "idle" | "copied" | "error";

export function ContactNumberRow({ phone, onRequestCall112 }: { phone: ContactNumber; onRequestCall112?: () => void }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  const reduced = useReducedMotion();
  const still = Boolean(reduced || (typeof document !== "undefined" && keyboardInteraction()));

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    request.current += 1;
  }, []);

  async function copy() {
    const currentRequest = ++request.current;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    let result: CopyState;
    try {
      await navigator.clipboard.writeText(phone.number);
      result = "copied";
    } catch {
      result = "error";
    }
    if (currentRequest !== request.current) return;
    setCopyState(result);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
  }

  const copyLabel = copyState === "copied" ? "დაკოპირებულია" : copyState === "error" ? "ვერ დაკოპირდა" : "კოპირება";

  return <div className={styles.contactEntry}>
    <Separator />
    <div className={styles.contactRow}>
      <div className={styles.phoneNumber}><span>{phone.label}</span><strong>{phone.number}</strong></div>
      <div className={styles.contactActions}>
        <Button variant="outline" onClick={copy} aria-label={`${phone.number} — ${copyLabel}`}>
          <span className={styles.copyContent} aria-hidden="true">
            <span className={styles.copyIcons}>
              <span className={styles.copyState} data-active={copyState !== "copied"}><Icon name="copy" /></span>
              <span className={styles.copyState} data-active={copyState === "copied"}><Icon name="check" /></span>
            </span>
            <TextMorph locale="ka" duration={250} ease="cubic-bezier(0.19, 1, 0.22, 1)" disabled={still}>
              {labelText(copyLabel)}
            </TextMorph>
          </span>
          <span className={styles.copyAnnouncement} role="status">{copyState === "idle" ? "" : `${phone.number} — ${copyLabel}`}</span>
        </Button>
        {phone.tel === "112" && onRequestCall112
          ? <Button variant="call" aria-label={`${phone.number} — დარეკვა`} onClick={onRequestCall112}><Icon name="phone" />{labelText("დარეკვა")}</Button>
          : <Button asChild variant="call"><a href={`tel:${phone.tel}`} aria-label={`${phone.number} — დარეკვა`}><Icon name="phone" />{labelText("დარეკვა")}</a></Button>}
      </div>
    </div>
  </div>;
}
