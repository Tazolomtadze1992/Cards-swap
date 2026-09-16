"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { FilterReset } from "../ui/filters";
import { Separator } from "../ui/separator";
import { labelText } from "./label-text";
import styles from "./learning-filters-sheet.module.css";

export function FilterSheet({ age, themes, selected, onApply, ageOptions = [{ value: "10-13", label: "10-13" }, { value: "14-18", label: "14-18" }], topicLabel = "თემები", allLabel = "ყველა თემა", description = "აირჩიე თემები და ასაკობრივი ჯგუფი.", tablet = false, resetAge }: {
  ageOptions?: { value: string; label: string }[]; topicLabel?: string; allLabel?: string; description?: string; tablet?: boolean; resetAge?: string;
  age: string; themes: readonly string[]; selected: number[];
  onApply: (age: string, themes: number[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draftAge, setDraftAge] = useState(age);
  const [draftThemes, setDraftThemes] = useState(selected);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const desktop = window.matchMedia(tablet ? "(min-width: 1051px)" : "(min-width: 641px)");
    const close = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, [tablet]);
  function changeOpen(next: boolean) {
    if (next) { setDraftAge(age); setDraftThemes([...selected]); }
    setOpen(next);
  }
  return <div className={styles.mobile} data-tablet={tablet} ref={setContainer}>
    <Drawer.Root autoFocus open={open} onOpenChange={changeOpen} shouldScaleBackground={false}>
      <Button asChild variant="subtle"><Drawer.Trigger>{labelText("ფილტრები")}</Drawer.Trigger></Button>
      <Drawer.Portal container={container}>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.sheet}>
          <header className={styles.header}>
            <Drawer.Handle className={styles.handle} />
            <div className={styles.titleRow}>
              <Drawer.Title className={styles.title}>ფილტრები</Drawer.Title>
              <Button size="icon" variant="subtle" aria-label="ფილტრების დახურვა" onClick={() => changeOpen(false)}><Icon name="close" /></Button>
            </div>
            <Separator />
          </header>
          <div className={styles.body}>
            <Drawer.Description className={styles.description}>{description}</Drawer.Description>
            <fieldset className={styles.group}>
              <legend>ასაკობრივი ჯგუფი</legend>
              <div className={styles.ages}>{ageOptions.map(({ value, label }) => <label className={styles.age} key={value}>
                <input type="radio" name="filter-age" checked={draftAge === value} onChange={() => setDraftAge(value)} />{label}
              </label>)}</div>
            </fieldset>
            <fieldset className={styles.group}>
              <legend>{topicLabel}</legend>
              <label className={styles.option}><input type="checkbox" checked={!draftThemes.length} onChange={() => setDraftThemes([])} />{allLabel}</label>
              {themes.map((theme, index) => <label className={styles.option} key={theme}>
                <input type="checkbox" checked={draftThemes.includes(index)} onChange={event => setDraftThemes(event.target.checked ? [...draftThemes, index] : draftThemes.filter(value => value !== index))} />{theme}
              </label>)}
            </fieldset>
            {resetAge !== undefined && <FilterReset disabled={!draftThemes.length && draftAge === resetAge} onClick={() => { setDraftThemes([]); setDraftAge(resetAge); }}>{labelText("ფილტრების გასუფთავება")}</FilterReset>}
          </div>
          <footer className={styles.footer}>
            <Separator />
            <Button onClick={() => { onApply(draftAge, draftThemes); setOpen(false); }}>{labelText("შედეგების ნახვა")}</Button>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  </div>;
}

export { FilterSheet as LearningFiltersSheet };
