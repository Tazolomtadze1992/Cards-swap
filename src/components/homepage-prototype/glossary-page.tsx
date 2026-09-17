"use client";

import { FilterReset } from "../ui/filters";
import { AlphabetFilter } from "../ui/alphabet-filter";
import { Separator } from "../ui/separator";
import { SearchField } from "../ui/search-field";
import { useState } from "react";
import { SiteHeader } from "./site-header";
import { GlossaryFiltersSheet } from "./glossary-filters-sheet";
import { alphabet, glossaryItems } from "./glossary-data";
import { labelText } from "./label-text";
import styles from "./glossary.module.css";

const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase("ka").trim();

export default function GlossaryPagePrototype() {
  const [query, setQuery] = useState("");
  const [letters, setLetters] = useState<string[]>([]);
  const search = normalize(query);
  const filtered = glossaryItems.filter(item =>
    (!letters.length || letters.includes(item.term[0])) &&
    (!search || normalize(`${item.term} ${item.definition}`).includes(search))
  );
  const groups = alphabet.map(letter => ({ letter, items: filtered.filter(item => item.term.startsWith(letter)) })).filter(group => group.items.length);
  const hasFilters = query.length > 0 || letters.length > 0;
  const reset = () => { setQuery(""); setLetters([]); };

  return <main className={styles.page}>
    <SiteHeader activeItem="glossary" />
    <div className={styles.intro}>
      <h1>მოძებნე სასურველი სიტყვა და გაიგე მნიშვნელობა</h1>
      <div className={styles.mobileControls}>
        <div className={styles.mobileSearch}>
          <SearchField value={query} onValueChange={setQuery} label="სიტყვის ძიება" clearLabel="ძიების გასუფთავება"
            placeholder="მოძებნე სიტყვა" aria-controls="glossary-results" />
        </div>
        <GlossaryFiltersSheet value={letters} onValueChange={setLetters} />
      </div>
    </div>
    <section className={styles.body} aria-label="ლექსიკონი">
      <div className={styles.divider}><Separator tone="subtle" /></div>
      <div className={styles.layout}>
        <aside className={styles.filters} aria-label="ლექსიკონის ფილტრები">
          <SearchField value={query} onValueChange={setQuery} label="სიტყვის ძიება" clearLabel="ძიების გასუფთავება"
            placeholder="მოძებნე სიტყვა" aria-controls="glossary-results" />
          <AlphabetFilter options={alphabet.map(letter => ({ value: letter, label: labelText(letter) }))}
            value={letters} onValueChange={setLetters} label="გაფილტრე საწყისი ასოებით"
            controls="glossary-results" />
          <FilterReset disabled={!hasFilters} onClick={reset}>{labelText("ფილტრების გასუფთავება")}</FilterReset>
        </aside>
        <div className={styles.results} id="glossary-results">
          <p className={styles.srOnly} role="status" aria-live="polite">ნაპოვნია {filtered.length} სიტყვა</p>
          {groups.map(group => <section key={group.letter} className={styles.group} aria-labelledby={`letter-${group.letter}`}>
            <h2 id={`letter-${group.letter}`}>{group.letter}</h2>
            <dl>{group.items.map(item => <div className={styles.entry} id={`term-${glossaryItems.indexOf(item)}`} key={item.term}><dt>{item.term}</dt><dd>{item.definition}<div className={styles.entryDivider}><Separator tone="subtle" /></div></dd></div>)}</dl>
          </section>)}
          {!filtered.length && <div className={styles.empty}><h2>სიტყვა ვერ მოიძებნა</h2><p>სცადე სხვა სიტყვა ან შეცვალე არჩეული ასოები.</p><FilterReset onClick={reset}>{labelText("ფილტრების გასუფთავება")}</FilterReset></div>}
        </div>
      </div>
    </section>
  </main>;
}
