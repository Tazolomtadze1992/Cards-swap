"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { animateNativeDialog, dialogMotion } from "../motion/surface-motion";
import { Button } from "../ui/button";
import { Icon, type IconName } from "../ui/icon";
import { findSearchResults, type SearchCategory } from "./site-search-data";
import styles from "./site-search-dialog.module.css";

const destinations: { title: string; href: string; icon: IconName }[] = [
  { title: "სწავლა და პრაქტიკა", href: "/prototypes/learning", icon: "learning" },
  { title: "რესურსები", href: "/prototypes/resources", icon: "resources" },
  { title: "ლექსიკონი", href: "/prototypes/glossary", icon: "glossary" },
  { title: "ხშირად დასმული კითხვები", href: "/prototypes/faq", icon: "faq" },
  { title: "მხარდამჭერი სერვისები", href: "/prototypes/services", icon: "services" },
];
const categoryIcons: Record<SearchCategory, IconName> = {
  resources: "resources", glossary: "glossary", faq: "faq", services: "services",
};

export function SiteSearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const rowLinks = useRef<(HTMLAnchorElement | null)[]>([]);
  const onCloseRef = useRef(onClose);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const searching = !!query.trim();
  const results = searching ? findSearchResults(query) : [];
  const rows = searching ? results : destinations;

  useLayoutEffect(() => { onCloseRef.current = onClose; });
  useLayoutEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    input.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const animation = animateNativeDialog(element, !closing, dialogMotion, !closing);
    let active = true;
    animation.finished.then(() => { if (active && closing) onCloseRef.current(); }, () => {});
    return () => { active = false; animation.cancel(); };
  }, [closing]);

  function moveFromInput(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const first = event.currentTarget.value.trim() ? findSearchResults(event.currentTarget.value)[0] : destinations[0];
      if (!first) return;
      event.preventDefault();
      onClose();
      router.push(first.href);
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    if (!rows.length) return;
    event.preventDefault();
    rowLinks.current[event.key === "ArrowDown" ? 0 : rows.length - 1]?.focus();
  }

  function moveThroughRows(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = index + (event.key === "ArrowDown" ? 1 : -1);
    if (next < 0 || next >= rows.length) input.current?.focus();
    else rowLinks.current[next]?.focus();
  }

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="site-search-title"
    onCancel={event => { event.preventDefault(); setClosing(true); }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setClosing(true);
    }}>
    <h2 id="site-search-title" className={styles.visuallyHidden}>ძიება</h2>
    <div className={styles.searchBar}>
      <div className={styles.searchField} role="search">
        <Icon name="search" size="medium" />
        <input ref={input} type="search" value={query} onChange={event => setQuery(event.target.value)}
          onKeyDown={moveFromInput} aria-label="მოძებნე საიტზე" placeholder="რას ეძებ?" autoComplete="off" />
      </div>
      <Button variant="subtle" size="icon" aria-label="ძიების დახურვა" onClick={() => setClosing(true)}><Icon name="close" /></Button>
    </div>
    <div className={styles.results} aria-label={searching ? "ძიების შედეგები" : "საიტის განყოფილებები"}>
      {rows.length ? <ul className={styles.resultList}>
        {rows.map((row, index) => <li key={searching ? `result-${index}` : row.href}>
          <Link href={row.href} ref={node => { rowLinks.current[index] = node; }}
            onClick={onClose} onKeyDown={event => moveThroughRows(event, index)}>
            <span className={styles.rowIcon}><Icon name={searching ? categoryIcons[results[index].category] : destinations[index].icon} size="medium" /></span>
            <span className={styles.resultTitle}>{row.title}</span>
            <span className={styles.rowChevron} aria-hidden="true"><Icon name="arrowRight" size="medium" /></span>
          </Link>
        </li>)}
      </ul> : <p className={styles.empty}>ვერაფერი მოიძებნა. სცადე სხვა სიტყვა.</p>}
    </div>
  </dialog>;
}
