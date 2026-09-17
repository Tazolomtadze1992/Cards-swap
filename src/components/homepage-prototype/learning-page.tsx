"use client";

import { LearningFiltersSheet } from "./learning-filters-sheet";
import { Separator } from "../ui/separator";
import { FilterTrigger, MultiSelectFilter } from "../ui/filters";
import { LearningCard } from "./learning-card";
import { TeenLearningCard } from "./teen-learning-card";
import { teenLearningTopics } from "./teen-learning-data";
import { resources } from "./resources-data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animateNativeDialog, dialogMotion } from "../motion/surface-motion";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import { SiteHeader } from "./site-header";
import { learningTopics } from "./learning-data";
import { labelText } from "./label-text";
import styles from "./learning.module.css";

const frameColors = ["#00cd9c", "#cc80ff", "#00b68e", "#19aeeb", "#5acc00", "#f888ff"];
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

export default function LearningPage({ initialAge = "" }: { initialAge?: string }) {
  const router = useRouter();
  const [age, setAge] = useState(initialAge);
  const isTeen = age === "14-18";
  const [choosingAge, setChoosingAge] = useState(!initialAge);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const closingAge = useRef(false);
  const ageAnimation = useRef<ReturnType<typeof animateNativeDialog> | null>(null);
  const ageDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const filteredTopics = learningTopics.filter((_, index) => !selectedThemes.length || selectedThemes.includes(topicThemeIndexes[index]));
  const filteredTeenTopics = teenLearningTopics.filter(item => !selectedThemes.length || selectedThemes.includes(item.theme));
  const teenColors = [...new Set(resources.filter(item => !item.video).map(item => item.color))].filter(color => color !== "#2d944d");

  useLayoutEffect(() => {
    const dialog = ageDialog.current;
    if (!dialog) return;
    if (choosingAge) {
      closingAge.current = false;
      dialog.showModal();
      ageAnimation.current = animateNativeDialog(dialog, true, dialogMotion, true);
    } else dialog.close();
    return () => { ageAnimation.current?.cancel(); };
  }, [choosingAge]);

  async function closeAge(after: () => void) {
    if (closingAge.current || !ageDialog.current) return;
    closingAge.current = true;
    ageAnimation.current?.cancel();
    const animation = animateNativeDialog(ageDialog.current, false, dialogMotion);
    ageAnimation.current = animation;
    try { await animation.finished; after(); } catch { /* Navigation unmounted the dialog. */ }
  }
  useEffect(() => {
    if (!choosingAge) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [choosingAge]);

  function continueToTopics() {
    if (!["6-9", "10-13", "14-18"].includes(age)) return;
    void closeAge(() => {
    if (age === "6-9" && initialAge !== "6-9") { router.push("/prototypes/learning/6-9"); return; }
    if (age === "14-18" && initialAge !== "14-18") { router.push("/prototypes/learning/14-18"); return; }
    if (age === "10-13" && initialAge) { router.push("/prototypes/learning?age=10-13"); return; }
    setChoosingAge(false);
    requestAnimationFrame(() => heading.current?.focus());
    });
  }

  return <main className={styles.page}>
    <SiteHeader activeItem="learning" />
    <section className={styles.content}>
      <h1 ref={heading} tabIndex={-1}>აირჩიე თემა და დაიწყე</h1>
      <div className={styles.filters}>
        <LearningFiltersSheet age={age} themes={themes} selected={selectedThemes} onApply={(nextAge, nextThemes) => { setAge(nextAge); setSelectedThemes(nextThemes); }} />
        <div className={styles.controls}>
          <MultiSelectFilter label="თემით გაფილტვრა" placeholder={labelText("ყველა თემა")} selectedLabel={labelText("არჩეული თემა")}
            options={themes.map((theme, index) => ({ value: index, label: labelText(theme) }))}
            value={selectedThemes} onValueChange={setSelectedThemes} />
          <FilterTrigger active={Boolean(age)} aria-haspopup="dialog" aria-expanded={choosingAge} aria-controls="learning-age-dialog" onClick={() => setChoosingAge(true)}>
            {labelText(age ? `${age} ასაკის ჯგუფი` : "ყველა ასაკი")}
          </FilterTrigger>
        </div>
        <p className={styles.count} aria-live="polite">{labelText("ნაჩვენებია : ")}<strong>{labelText(`${isTeen ? filteredTeenTopics.length : filteredTopics.length} თემა`)}</strong></p>
      </div>
      <div className={styles.divider}><Separator /></div>
      <div className={styles.grid}>
        {isTeen ? filteredTeenTopics.map(item => <TeenLearningCard key={item.id} item={item} color={teenColors[teenLearningTopics.indexOf(item) % teenColors.length]} />) : filteredTopics.map((item) => {
          const index = learningTopics.indexOf(item);
          return <LearningCard key={item.id} item={item}
            color={frameColors[index % frameColors.length]} eager={index < 3} age={age} />;
        })}
      </div>
    </section>
    <dialog id="learning-age-dialog" ref={ageDialog} className={styles.ageDialog} aria-labelledby="age-title" onCancel={event => event.preventDefault()}>
      <div className={styles.ageDialogClose}><Button asChild variant="subtle" size="icon"><Link href="/prototypes/homepage" aria-label="მთავარ გვერდზე დაბრუნება" onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); void closeAge(() => router.push("/prototypes/homepage")); }}><Icon name="close" /></Link></Button></div>
      <h2 id="age-title">აირჩიე შენი ასაკი</h2>
      <fieldset className={styles.ages}>
        <legend className={styles.srOnly}>ასაკობრივი ჯგუფი</legend>
        {["6-9", "10-13", "14-18"].map(value => <label key={value} className={styles.ageOption}>
          <input type="radio" name="age" value={value} checked={age === value} onChange={() => setAge(value)} />
          <span>{value}</span>
        </label>)}
      </fieldset>
      <button className={styles.continue} disabled={!age} onClick={continueToTopics}>{labelText("გაგრძელება")} <Icon name="chevronsRight" /></button>
    </dialog>
  </main>;
}
