"use client";

import { useRef, useState } from "react";
import { SiteHeader } from "./homepage-sections";
import { alphabet, glossaryItems } from "./glossary-data";
import styles from "./glossary.module.css";

const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase("ka").trim();

export default function GlossaryPagePrototype() {
  const [query, setQuery] = useState("");
  const [letters, setLetters] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const search = normalize(query);
  const filtered = glossaryItems.filter(item =>
    (!letters.length || letters.includes(item.term[0])) &&
    (!search || normalize(`${item.term} ${item.definition}`).includes(search))
  );
  const groups = alphabet.map(letter => ({ letter, items: filtered.filter(item => item.term.startsWith(letter)) })).filter(group => group.items.length);
  const hasFilters = query.length > 0 || letters.length > 0;
  const reset = () => { setQuery(""); setLetters([]); };

  return <main className={styles.page}>
    <SiteHeader glossaryPage />
    <div className={styles.intro}><h1>მოძებნე სასურველი სიტყვა და გაიგე მნიშვნელობა</h1></div>
    <section className={styles.body} aria-label="ლექსიკონი">
      <div className={styles.layout}>
        <aside className={styles.filters} aria-label="ლექსიკონის ფილტრები">
          <div className={styles.search} role="search">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/glossary/search.svg" width={24} height={24} alt="" />
            <input ref={searchRef} aria-label="სიტყვის ძიება" placeholder="მოძებნე სიტყვა" type="search" value={query} onChange={event => setQuery(event.target.value)} />
            {query && <button type="button" className={styles.clearSearch} aria-label="ძიების გასუფთავება" onClick={() => { setQuery(""); searchRef.current?.focus(); }}>×</button>}
          </div>
          <div className={styles.alphabet} role="group" aria-label="გაფილტრე საწყისი ასოებით">
            {alphabet.map(letter => <button key={letter} type="button" aria-pressed={letters.includes(letter)} aria-controls="glossary-results" onClick={() => setLetters(current => current.includes(letter) ? current.filter(value => value !== letter) : [...current, letter])}>{letter}</button>)}
          </div>
          <button className={styles.reset} type="button" disabled={!hasFilters} onClick={reset}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/glossary/reset.svg" width={16} height={16} alt="" />
            ფილტრების გასუფთავება
          </button>
          <p className={styles.srOnly} role="status" aria-live="polite">ნაპოვნია {filtered.length} სიტყვა</p>
        </aside>
        <div className={styles.results} id="glossary-results">
          {groups.map(group => <section key={group.letter} className={styles.group} aria-labelledby={`letter-${group.letter}`}>
            <h2 id={`letter-${group.letter}`}>{group.letter}</h2>
            <dl>{group.items.map(item => <div className={styles.entry} key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl>
          </section>)}
          {!filtered.length && <div className={styles.empty}><h2>სიტყვა ვერ მოიძებნა</h2><p>სცადე სხვა სიტყვა ან შეცვალე არჩეული ასოები.</p><button type="button" className={styles.reset} onClick={reset}>ფილტრების გასუფთავება</button></div>}
        </div>
      </div>
    </section>
  </main>;
}
