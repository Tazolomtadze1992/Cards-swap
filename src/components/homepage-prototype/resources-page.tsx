"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { SiteHeader } from "./homepage-sections";
import { ageGroups, resources, resourceTypes, type AgeGroup, type ResourceItem, type ResourceType } from "./resources-data";
import styles from "./resources.module.css";

export default function ResourcesPagePrototype() {
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [age, setAge] = useState<AgeGroup | "all">("all");
  const [openMenu, setOpenMenu] = useState<"type" | "age" | null>(null);
  const [preview, setPreview] = useState<ResourceItem | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const filtered = resources.filter(item => (!types.length || types.includes(item.type)) && (age === "all" || item.age === age));
  const hasFilters = types.length > 0 || age !== "all";

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!filterRef.current?.contains(event.target as Node)) setOpenMenu(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpenMenu(null); setPreview(null); } };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, []);

  useEffect(() => {
    if (!preview) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; requestAnimationFrame(() => returnFocusRef.current?.focus()); };
  }, [preview]);

  const clear = () => { setTypes([]); setAge("all"); setOpenMenu(null); };
  const showPreview = (item: ResourceItem, trigger: HTMLButtonElement) => { returnFocusRef.current = trigger; setPreview(item); };
  const closePreview = () => setPreview(null);
  return <main className={styles.page}>
    <SiteHeader resourcesPage />
    <div className={styles.intro}><h1>აირჩიე თემა და დაიწყე</h1></div>
    <section className={styles.catalogue} aria-labelledby="resources-count">
      <div className={styles.toolbar}>
        <div className={styles.controls} ref={filterRef}>
          <div className={styles.filter}>
            <button className={styles.filterTrigger} data-active={types.length > 0} type="button" aria-expanded={openMenu === "type"} aria-controls="resource-type-menu" onClick={() => setOpenMenu(value => value === "type" ? null : "type")}>
              {types.length ? `რესურსის ტიპი : ${types.length}` : "ყველა რესურსი"}<ChevronDown size={18} aria-hidden="true" />
            </button>
            {openMenu === "type" && <div className={styles.filterMenu} id="resource-type-menu">
              {resourceTypes.map(type => <label key={type}>
                <input type="checkbox" checked={types.includes(type)} onChange={() => setTypes(current => current.includes(type) ? current.filter(value => value !== type) : [...current, type])} />
                <span>{type}</span>
              </label>)}
            </div>}
          </div>
          <div className={styles.filter}>
            <button className={styles.filterTrigger} data-active={age !== "all"} type="button" aria-expanded={openMenu === "age"} aria-controls="resource-age-menu" onClick={() => setOpenMenu(value => value === "age" ? null : "age")}>
              {age === "all" ? "ყველა ასაკი" : `არჩეული ასაკის ჯგუფი : ${age}`}<ChevronDown size={18} aria-hidden="true" />
            </button>
            {openMenu === "age" && <div className={styles.filterMenu} id="resource-age-menu" role="radiogroup" aria-label="ასაკით გაფილტვრა">
              <label>
                <input type="radio" name="resource-age" checked={age === "all"} onChange={() => { setAge("all"); setOpenMenu(null); }} />
                <span>ყველა ასაკი</span>
              </label>
              {ageGroups.map(group => <label key={group}>
                <input type="radio" name="resource-age" checked={age === group} onChange={() => { setAge(group); setOpenMenu(null); }} />
                <span>{group}</span>
              </label>)}
            </div>}
          </div>
          <button className={styles.clearFilters} type="button" disabled={!hasFilters} onClick={clear}>
            ფილტრების გასუფთავება
            <Image src="/assets/resources/reset.svg" width={16} height={16} alt="" />
          </button>
        </div>
        <p className={styles.count} id="resources-count" aria-live="polite">ნაჩვენებია : <strong>{filtered.length} ფაილი</strong></p>
      </div>
      <div className={styles.divider} />
      {filtered.length ? <div className={styles.grid}>
        {filtered.map(item => <article className={styles.card} key={item.id} style={{ "--card-color": item.color } as CSSProperties}>
          {item.video ? <button className={styles.videoPreview} type="button" aria-label={`${item.title} — ვიდეოს ნახვა`} onClick={event => showPreview(item, event.currentTarget)}>
            <Image className={styles.thumbnail} src={`/assets/resources/${item.image}`} width={756} height={504} alt="" />
            <span className={styles.play}><Image src="/assets/resources/play.svg" width={24} height={24} alt="" /></span>
          </button> : <div className={styles.cardTop}>
            <Image className={styles.documentIcon} src={`/assets/resources/${item.image}`} width={92} height={80} alt="" />
            <span className={styles.agePill}>{item.age}</span>
          </div>}
          {item.video ? <div className={styles.videoCopy}><h2>{item.title}</h2><span className={styles.agePill}>{item.age}</span></div> : <div className={styles.copy}><h2>{item.title}</h2><p>{item.description}</p></div>}
          {!item.video && <button className={styles.download} type="button" onClick={event => showPreview(item, event.currentTarget)}>{item.type === "დოკუმენტი" ? "დოკუმენტის გადმოწერა" : "რესურსის ნახვა"}{item.type === "დოკუმენტი" && <Image src="/assets/resources/download.svg" width={24} height={24} alt="" />}</button>}
        </article>)}
      </div> : <div className={styles.empty}><h2>რესურსი ვერ მოიძებნა</h2><p>სცადე სხვა ტიპი ან ასაკობრივი ჯგუფი.</p><button type="button" onClick={clear}>ფილტრების გასუფთავება</button></div>}
    </section>
    {preview && <div className={styles.overlay} role="presentation" onPointerDown={event => { if (event.target === event.currentTarget) closePreview(); }}>
      <section className={styles.preview} role="dialog" aria-modal="true" aria-labelledby="resource-preview-title">
        <button ref={closeRef} className={styles.close} type="button" aria-label="დახურვა" onClick={closePreview}>×</button>
        {preview.video ? <div className={styles.previewMedia}><Image src={`/assets/resources/${preview.image}`} width={756} height={504} alt="" /><span className={styles.play}><Image src="/assets/resources/play.svg" width={24} height={24} alt="" /></span></div> : <Image className={styles.previewIcon} src={`/assets/resources/${preview.image}`} width={92} height={80} alt="" />}
        <span className={styles.kind}>{preview.type} · {preview.age}</span>
        <h2 id="resource-preview-title">{preview.title}</h2>
        <p>{preview.description}</p>
        <p className={styles.prototypeNote}>{preview.video ? "ვიდეო" : "ჩამოსატვირთი ფაილი"} საბოლოო კონტენტთან ერთად დაემატება.</p>
      </section>
    </div>}
  </main>;
}
