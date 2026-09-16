"use client";

import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { labelText } from "../homepage-prototype/label-text";
import styles from "./contact-number-row.module.css";

export type ContactNumber = { number: string; tel: string; label: string };

export function ContactNumberRow({ phone, onCopyStatus }: {
  phone: ContactNumber;
  onCopyStatus: (message: string) => void;
}) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(phone.number);
      onCopyStatus(`${phone.number} — ნომერი დაკოპირებულია`);
    } catch {
      onCopyStatus("კოპირება ვერ მოხერხდა. მონიშნე და დააკოპირე ნომერი.");
    }
  }
  return <div className={styles.contactEntry}>
    <Separator />
    <div className={styles.contactRow}>
      <div className={styles.phoneNumber}><span>{phone.label}</span><strong>{phone.number}</strong></div>
      <div className={styles.contactActions}>
        <Button variant="outline" onClick={copy} aria-label={`${phone.number} — კოპირება`}><Icon name="copy" />{labelText("კოპირება")}</Button>
        <Button asChild variant="call"><a href={`tel:${phone.tel}`} aria-label={`${phone.number} — დარეკვა`}><Icon name="phone" />{labelText("დარეკვა")}</a></Button>
      </div>
    </div>
  </div>;
}
