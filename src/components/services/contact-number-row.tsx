"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { labelText } from "../homepage-prototype/label-text";
import styles from "./contact-number-row.module.css";

export type ContactNumber = { number: string; tel: string; label: string };

type CopyState = "idle" | "copied" | "error";

export function ContactNumberRow({ phone }: { phone: ContactNumber }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(phone.number);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const copyLabel = copyState === "copied" ? "დაკოპირებულია" : copyState === "error" ? "ვერ დაკოპირდა" : "კოპირება";

  return <div className={styles.contactEntry}>
    <Separator />
    <div className={styles.contactRow}>
      <div className={styles.phoneNumber}><span>{phone.label}</span><strong>{phone.number}</strong></div>
      <div className={styles.contactActions}>
        <Button variant="outline" onClick={copy} aria-label={`${phone.number} — ${copyLabel}`}>
          <span className={styles.copyContent} aria-hidden="true">
            <span className={styles.copyState} data-active={copyState === "idle"}><Icon name="copy" />{labelText("კოპირება")}</span>
            <span className={styles.copyState} data-active={copyState === "copied"}><Icon name="check" />{labelText("დაკოპირებულია")}</span>
            <span className={styles.copyState} data-active={copyState === "error"}><Icon name="copy" />{labelText("ვერ დაკოპირდა")}</span>
          </span>
          <span className={styles.copyAnnouncement} role="status">{copyState === "idle" ? "" : `${phone.number} — ${copyLabel}`}</span>
        </Button>
        <Button asChild variant="call"><a href={`tel:${phone.tel}`} aria-label={`${phone.number} — დარეკვა`}><Icon name="phone" />{labelText("დარეკვა")}</a></Button>
      </div>
    </div>
  </div>;
}
