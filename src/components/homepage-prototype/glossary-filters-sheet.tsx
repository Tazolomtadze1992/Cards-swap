"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { AlphabetFilter } from "../ui/alphabet-filter";
import { Button } from "../ui/button";
import { FilterReset } from "../ui/filters";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { alphabet } from "./glossary-data";
import { labelText } from "./label-text";
import sheetStyles from "./learning-filters-sheet.module.css";
import styles from "./glossary-filters-sheet.module.css";

export function GlossaryFiltersSheet({ value, onValueChange }: {
  value: string[];
  onValueChange: (value: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 641px)");
    const close = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  function changeOpen(next: boolean) {
    if (next) setDraft([...value]);
    setOpen(next);
  }

  return <div className={styles.root} ref={setContainer} data-active={value.length > 0}>
    <Drawer.Root autoFocus open={open} onOpenChange={changeOpen} shouldScaleBackground={false}>
      <Button asChild variant="subtle" size="icon">
        <Drawer.Trigger aria-label="ასოებით გაფილტვრა"><Icon name="filter" size="medium" /></Drawer.Trigger>
      </Button>
      <Drawer.Portal container={container}>
        <Drawer.Overlay className={sheetStyles.overlay} />
        <Drawer.Content className={sheetStyles.sheet}>
          <header className={sheetStyles.header}>
            <Drawer.Handle className={sheetStyles.handle} />
            <div className={sheetStyles.titleRow}>
              <Drawer.Title className={sheetStyles.title}>ასოებით გაფილტვრა</Drawer.Title>
              <Button size="icon" variant="subtle" aria-label="ფილტრების დახურვა" onClick={() => changeOpen(false)}><Icon name="close" /></Button>
            </div>
            <Separator />
          </header>
          <div className={sheetStyles.body}>
            <Drawer.Description className={sheetStyles.description}>აირჩიე ერთი ან რამდენიმე საწყისი ასო.</Drawer.Description>
            <AlphabetFilter options={alphabet.map(letter => ({ value: letter, label: labelText(letter) }))}
              value={draft} onValueChange={setDraft} label="გაფილტრე საწყისი ასოებით" controls="glossary-results" />
            <div className={styles.reset}>
              <FilterReset disabled={!draft.length} onClick={() => setDraft([])}>{labelText("ფილტრების გასუფთავება")}</FilterReset>
            </div>
          </div>
          <footer className={sheetStyles.footer}>
            <Separator />
            <Button onClick={() => { onValueChange(draft); setOpen(false); }}>{labelText("შედეგების ნახვა")}</Button>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  </div>;
}
