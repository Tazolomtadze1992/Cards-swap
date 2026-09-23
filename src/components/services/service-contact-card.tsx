"use client";

import { useId } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { labelText } from "../homepage-prototype/label-text";
import { ContactNumberRow, type ContactNumber } from "./contact-number-row";
import styles from "./service-contact-card.module.css";

export type ServiceContact = {
  title: string;
  agency: string;
  badges: readonly string[];
  when: string;
  help: string;
  note?: string;
  numbers: readonly ContactNumber[];
};

export function ServiceContactCard({ contact, onRequestCall112 }: { contact: ServiceContact; onRequestCall112?: () => void }) {
  const titleId = useId();
  return <section className={styles.contactCard} aria-labelledby={titleId}>
    <div className={styles.contactHeading}>
      <h3 id={titleId}>{contact.title}</h3>
      <div className={styles.badges}>{contact.badges.map(badge => <Badge key={badge}>{labelText(badge)}</Badge>)}</div>
      <p className={styles.contactAgency}>{contact.agency}</p>
    </div>
    <Separator />
    <div className={styles.contactDetails}>
      <div><h4>როდის გამოიყენებ?</h4><p>{contact.when}</p></div>
      <div><h4>როგორ დაგეხმარება?</h4><p>{contact.help}</p></div>
    </div>
    {contact.note && <p className={styles.contactNote}>{contact.note}</p>}
    {contact.numbers.map(phone => <ContactNumberRow key={phone.tel} phone={phone} onRequestCall112={onRequestCall112} />)}
  </section>;
}
