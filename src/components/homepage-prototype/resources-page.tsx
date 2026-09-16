"use client";

import { FilterSheet } from "./learning-filters-sheet";
import { Separator } from "../ui/separator";
import { FilterReset, MultiSelectFilter, SelectFilter } from "../ui/filters";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "./site-header";
import { VideoPlayIndicator } from "./resource-media";
import { ResourceCard } from "./resource-card";
import { labelText } from "./label-text";
import { ageGroups, resources, resourceTypes, type AgeGroup, type ResourceItem, type ResourceType } from "./resources-data";
import styles from "./resources.module.css";

export default function ResourcesPagePrototype() {
  const router = useRouter();
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [age, setAge] = useState<AgeGroup | "all">("all");
  const [preview, setPreview] = useState<ResourceItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const filtered = resources.filter(item => (!types.length || types.includes(item.type)) && (age === "all" || item.age === age));
  const hasFilters = types.length > 0 || age !== "all";

  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setPreview(null); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);

  useEffect(() => {
    if (!preview) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; requestAnimationFrame(() => returnFocusRef.current?.focus()); };
  }, [preview]);

  const clear = () => { setTypes([]); setAge("all"); };
  const showPreview = (item: ResourceItem, trigger: HTMLButtonElement) => { returnFocusRef.current = trigger; setPreview(item); };
  const openResource = (item: ResourceItem, trigger: HTMLButtonElement) => {
    if (item.type === "სტატია") { router.push("/prototypes/articles"); return; }
    showPreview(item, trigger);
  };
  const closePreview = () => setPreview(null);
  return <main className={styles.page}>
    <SiteHeader activeItem="resources" />
    <div className={styles.intro}><h1>აირჩიე თემა და დაიწყე</h1></div>
    <section className={styles.catalogue} aria-labelledby="resources-count">
      <div className={styles.toolbar}>
        <FilterSheet tablet age={age} themes={resourceTypes} selected={types.map(type => resourceTypes.indexOf(type))}
          ageOptions={[{ value: "all", label: "ყველა ასაკი" }, ...ageGroups.map(value => ({ value, label: value }))]}
          topicLabel="რესურსის ტიპი" allLabel="ყველა რესურსი" description="აირჩიე რესურსის ტიპი და ასაკობრივი ჯგუფი." resetAge="all"
          onApply={(nextAge, indexes) => { setAge(nextAge as AgeGroup | "all"); setTypes(indexes.map(index => resourceTypes[index])); }} />
        <div className={styles.controls}>
          <MultiSelectFilter layout="catalogue" label="რესურსის ტიპით გაფილტვრა" placeholder={labelText("ყველა რესურსი")} selectedLabel={labelText("რესურსის ტიპი")}
            options={resourceTypes.map(type => ({ value: type, label: labelText(type) }))}
            value={types} onValueChange={setTypes} />
          <SelectFilter<AgeGroup | "all"> label="ასაკით გაფილტვრა" placeholder={labelText("ყველა ასაკი")} selectedLabel={labelText("არჩეული ასაკის ჯგუფი")}
            options={[{ value: "all", label: labelText("ყველა ასაკი") }, ...ageGroups.map(group => ({ value: group, label: group }))]}
            value={age} emptyValue="all" onValueChange={setAge} />
          <FilterReset disabled={!hasFilters} onClick={clear}>{labelText("ფილტრების გასუფთავება")}</FilterReset>
        </div>
        <p className={styles.count} id="resources-count" aria-live="polite">{labelText("ნაჩვენებია : ")}<strong>{labelText(`${filtered.length} ფაილი`)}</strong></p>
      </div>
      <div className={styles.divider}><Separator /></div>
      {filtered.length ? <div className={styles.grid}>
        {filtered.map(item => <ResourceCard item={item} key={item.id} onOpen={openResource} />)}
      </div> : <div className={styles.empty}><h2>რესურსი ვერ მოიძებნა</h2><p>სცადე სხვა ტიპი ან ასაკობრივი ჯგუფი.</p><Button size="compact" onClick={clear}>{labelText("ფილტრების გასუფთავება")}</Button></div>}
    </section>
    {preview && <div className={styles.overlay} role="presentation" onPointerDown={event => { if (event.target === event.currentTarget) closePreview(); }}>
      <section className={styles.preview} role="dialog" aria-modal="true" aria-labelledby="resource-preview-title">
        <div className={styles.close}><Button ref={closeRef} size="icon" aria-label="დახურვა" onClick={closePreview}><Icon name="close" /></Button></div>
        {preview.video ? <div className={styles.previewMedia}><Image src={`/assets/resources/${preview.image}`} width={756} height={504} alt="" /><VideoPlayIndicator /></div> : <Image className={styles.previewIcon} src={`/assets/resources/${preview.image}`} width={92} height={80} alt="" />}
        <span className={styles.kind}>{labelText(`${preview.type} · ${preview.age}`)}</span>
        <h2 id="resource-preview-title">{preview.title}</h2>
        <p>{preview.description}</p>
        <Separator /><p className={styles.prototypeNote}>{preview.video ? "ვიდეო" : "ჩამოსატვირთი ფაილი"} საბოლოო კონტენტთან ერთად დაემატება.</p>
      </section>
    </div>}
  </main>;
}
