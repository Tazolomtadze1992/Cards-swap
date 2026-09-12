"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown, ChevronsRight } from "lucide-react";
import { SiteHeader } from "./homepage-sections";
import { learningTopics } from "./learning-data";
import styles from "./learning.module.css";

const frameColors = ["#00cd9c", "#cc80ff", "#00b68e", "#19aeeb", "#5acc00", "#f888ff"];
const fillColors = ["#c9e7dd", "#e8c4ff", "#00cd9c", "#5ea8ff", "#9ccaed", "#aea3e3"];
const themes = [
  "ჩემი სხეული, გრძნობები და საზღვრები",
  "უსაფრთხო და საფრთხის შემცველი სიტუაციები",
  "უსაფრთხოება ონლაინ და პირისპირ",
  "შესაძლო ძალადობის ნიშნები, მითები და პასუხისმგებლობა",
  "დახმარების თხოვნა და ამბის თქმა",
  "შეტყობინება, გადამისამართება და დახმარების გზები",
  "რა შეიძლება მოხდეს შემდეგ",
] as const;
const topicThemeIndexes = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6];

export default function LearningPage() {
  const [age, setAge] = useState("");
  const [choosingAge, setChoosingAge] = useState(true);
  const [variant, setVariant] = useState<1 | 2>(1);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const ageDialog = useRef<HTMLDialogElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const filteredTopics = learningTopics.filter((_, index) => !selectedThemes.length || selectedThemes.includes(topicThemeIndexes[index]));

  useEffect(() => {
    const dialog = ageDialog.current;
    if (choosingAge) dialog?.showModal();
    else dialog?.close();
  }, [choosingAge]);
  useEffect(() => {
    if (!choosingAge) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [choosingAge]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!filtersRef.current?.contains(event.target as Node)) setThemeMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setThemeMenuOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  function continueToTopics() {
    if (age !== "10-13") return;
    setChoosingAge(false);
    requestAnimationFrame(() => heading.current?.focus());
  }

  return <main className={styles.page}>
    <SiteHeader learningPage />
    <section className={styles.content}>
      <h1 ref={heading} tabIndex={-1}>აირჩიე თემა და დაიწყე</h1>
      <div className={styles.filters}>
        <div className={styles.controls} ref={filtersRef}>
          <div className={styles.filter}>
            <button className={styles.filterTrigger} data-active={selectedThemes.length > 0} type="button" aria-expanded={themeMenuOpen} aria-controls="learning-theme-menu" onClick={() => setThemeMenuOpen(value => !value)}>
              {selectedThemes.length ? `არჩეული თემა : ${selectedThemes.length}` : "ყველა თემა"}<ChevronDown size={18} aria-hidden="true" />
            </button>
            {themeMenuOpen && <div className={styles.filterMenu} id="learning-theme-menu">
              {themes.map((theme, index) => <label key={theme}>
                <input type="checkbox" checked={selectedThemes.includes(index)} onChange={() => setSelectedThemes(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index])} />
                <span>{theme}</span>
              </label>)}
            </div>}
          </div>
          <button className={styles.filterTrigger} data-active={Boolean(age)} type="button" onClick={() => setChoosingAge(true)}>
            {age ? `${age} ასაკის ჯგუფი` : "ყველა ასაკი"}<ChevronDown size={18} aria-hidden="true" />
          </button>
          <button className={styles.clearFilters} type="button" disabled={!selectedThemes.length && !age} onClick={() => { setSelectedThemes([]); setAge(""); setChoosingAge(true); }}>
            ფილტრების გასუფთავება
            <Image src="/assets/resources/reset.svg" width={16} height={16} alt="" />
          </button>
        </div>
        <p aria-live="polite">ნაჩვენებია : <strong>{filteredTopics.length} თემა</strong></p>
      </div>
      <div className={styles.grid} data-variant={variant}>
        {filteredTopics.map((item) => {
          const index = learningTopics.indexOf(item);
          return <Link key={item.id} className={styles.card}
          style={{ "--card-color": (variant === 1 ? frameColors : fillColors)[index % 6] } as CSSProperties}
          href="/prototypes/articles" aria-label={`${item.title} — სტატიის გახსნა`}>
          <span className={styles.cardBody}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="" width={1000} height={646} loading={index < 3 ? "eager" : "lazy"} />
            <span className={styles.cardTitle}>{item.title}</span>
          </span>
          {variant === 2 && <span className={styles.start}>დაწყება</span>}
        </Link>})}
      </div>
      <div className={styles.switcher} role="group" aria-label="დიზაინის ვარიანტი">
        <span>დიზაინის ვარიანტი</span>
        {([1, 2] as const).map(value => <button key={value} aria-pressed={variant === value} onClick={() => setVariant(value)}>ვარიანტი {value}</button>)}
      </div>
    </section>
    <dialog ref={ageDialog} className={styles.ageDialog} aria-labelledby="age-title" onCancel={event => event.preventDefault()}>
      <h2 id="age-title">აირჩიე შენი ასაკი</h2>
      <fieldset className={styles.ages}>
        <legend className={styles.srOnly}>ასაკობრივი ჯგუფი</legend>
        {["6-9", "10-13", "14-18"].map(value => <label key={value} className={styles.ageOption}>
          <input type="radio" name="age" value={value} checked={age === value} onChange={() => setAge(value)} />
          <span>{value}</span>
        </label>)}
      </fieldset>
      <p className={styles.ageNotice} role="status">{age && age !== "10-13" ? "ეს ასაკობრივი ჯგუფი მალე დაემატება. ახლა შეგიძლია აირჩიო 10-13." : ""}</p>
      <button className={styles.continue} disabled={age !== "10-13"} onClick={continueToTopics}>გაგრძელება <ChevronsRight aria-hidden="true" /></button>
    </dialog>
  </main>;
}
