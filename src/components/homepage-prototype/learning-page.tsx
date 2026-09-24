"use client";

import { LearningFiltersSheet } from "./learning-filters-sheet";
import { Separator } from "../ui/separator";
import { FilterTrigger, MultiSelectFilter } from "../ui/filters";
import { LearningCard } from "./learning-card";
import { TeenLearningCard } from "./teen-learning-card";
import { teenLearningArticles } from "./teen-learning-data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animateNativeDialog, dialogMotion } from "../motion/surface-motion";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import { SiteHeader } from "./site-header";
import { learningTopics6to9 } from "./learning-data-6-9";
import { learningTopics10to13 } from "./learning-data-10-13";
import { labelText } from "./label-text";
import styles from "./learning.module.css";

const teenColors = ["#c9e7dd", "#d3a5a8", "#ada3e4", "#d2b9e2", "#a5d089"];
const middleSchoolColors = ["#FFC800", "#58CC02", "#1CB0F6", "#00CD9C", "#CE82FF"];
const teenThemes = [
  "შენი სხეული, გრძნობები და პირადი საზღვრები",
  "უსაფრთხო და საფრთხის შემცველი სიტუაციები",
  "უსაფრთხოება ონლაინ და რეალურ ცხოვრებაში",
  "ძალადობის ნიშნები და მითები",
  "დახმარების თხოვნა და ამბის თქმა",
  "დახმარების თხოვნა და მხარდაჭერის სერვისები",
  "რა შეიძლება მოხდეს შემდეგ",
  "მხარდაჭერა და უკეთ გახდომა",
] as const;
const middleSchoolThemes = [
  "შენი სხეული, გრძნობები და საზღვრები",
  "სხეული და საფრთხე",
  "ინტერნეტი და დაძალება",
  "ძალადობის ნიშნები, მითები და დამნაშავე",
  "დახმარების თხოვნა და დახმარების გზები",
  "შენ და სასამართლო",
  "ემოციები და უკეთ გახდომა",
] as const;
const youngestThemes = [
  "შენი სხეული, უსაფრთხო წრე და საზღვრები",
  "როდის ხარ უსაფრთხოდ და როდის არა?",
  "ინტერნეტი და სხვა ადგილები",
  "რა არ არის უსაფრთხო?",
  "დახმარების თხოვნა და შენი გრძნობები",
  "ვინ როგორ დაგეხმარება?",
  "როგორ დაგიცავს სასამართლო?",
] as const;
const themesByAge = { "6-9": youngestThemes, "10-13": middleSchoolThemes, "14-18": teenThemes };
const middleSchoolTopicThemeIndexes = [0, 0, 0, 0, 1, 2, 3, 3, 4, 4, 5, 5, 5, 6];
const youngestTopicThemeIndexes = [0, 0, 0, 1, 1, 2, 3, 4, 4, 4, 5, 6, 6];

export default function LearningPage({ initialAge = "" }: { initialAge?: string }) {
  const router = useRouter();
  const [age, setAge] = useState(initialAge);
  const isTeen = age === "14-18";
  const isYoungest = age === "6-9";
  const [choosingAge, setChoosingAge] = useState(!initialAge);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const closingAge = useRef(false);
  const ageAnimation = useRef<ReturnType<typeof animateNativeDialog> | null>(null);
  const ageDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const activeTopics = isYoungest ? learningTopics6to9 : learningTopics10to13;
  const activeTopicThemeIndexes = isYoungest ? youngestTopicThemeIndexes : middleSchoolTopicThemeIndexes;
  const activeThemes = isTeen ? teenThemes : isYoungest ? youngestThemes : middleSchoolThemes;
  const filteredTopics = activeTopics
    .map((item, index) => ({ item, themeIndex: activeTopicThemeIndexes[index] }))
    .filter(({ themeIndex }) => !selectedThemes.length || selectedThemes.includes(themeIndex));
  const filteredTeenTopics = teenLearningArticles.filter(item => !selectedThemes.length || selectedThemes.includes(item.theme));

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
      <div className={styles.intro}>
        <h1 ref={heading} tabIndex={-1}>აირჩიე თემა და დაიწყე</h1>
        <p>იმისთვის, რომ დაგიცვათ, ჩვენ არ ვინახავთ შენს მონაცემებს. ამიტომ როგორც კი სწავლის პროცესს შეწყვეტ, შენი მონაცემები წაიშლება</p>
      </div>
      <div className={styles.filters}>
        <LearningFiltersSheet age={age} themes={activeThemes} themesByAge={themesByAge} selected={selectedThemes} onApply={(nextAge, nextThemes) => { setAge(nextAge); setSelectedThemes(nextThemes); }} />
        <div className={styles.controls}>
          <MultiSelectFilter label="თემით გაფილტვრა" placeholder={labelText("ყველა თემა")} selectedLabel={labelText("არჩეული თემა")}
            options={activeThemes.map((theme, index) => ({ value: index, label: labelText(theme) }))}
            value={selectedThemes} onValueChange={setSelectedThemes} />
          <FilterTrigger active={Boolean(age)} aria-haspopup="dialog" aria-expanded={choosingAge} aria-controls="learning-age-dialog" onClick={() => setChoosingAge(true)}>
            {labelText(age ? `${age} ასაკის ჯგუფი` : "ყველა ასაკი")}
          </FilterTrigger>
        </div>
        <p className={styles.count} aria-live="polite">{labelText("ნაჩვენებია : ")}<strong>{labelText(`${isTeen ? filteredTeenTopics.length : filteredTopics.length} სტატია`)}</strong></p>
      </div>
      <div className={styles.divider}><Separator /></div>
      <div className={styles.grid}>
        {isTeen ? filteredTeenTopics.map((item, index) => <TeenLearningCard key={item.id} item={item} themeTitle={teenThemes[item.theme]} color={teenColors[index % teenColors.length]} />) : filteredTopics.map(({ item, themeIndex }, index) => {
          return <LearningCard key={item.id} item={item} themeTitle={activeThemes[themeIndex]}
            color={middleSchoolColors[index % middleSchoolColors.length]} eager={index < 3} age={age} />;
        })}
      </div>
    </section>
    <dialog id="learning-age-dialog" ref={ageDialog} className={styles.ageDialog} aria-labelledby="age-title" onCancel={event => event.preventDefault()}>
      <div className={styles.ageDialogClose}><Button asChild variant="subtle" size="icon"><Link href="/prototypes/homepage" aria-label="მთავარ გვერდზე დაბრუნება" onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); void closeAge(() => router.push("/prototypes/homepage")); }}><Icon name="close" /></Link></Button></div>
      <h2 id="age-title">მონიშნე რამდენი წლის ხარ</h2>
      <fieldset className={styles.ages}>
        <legend className={styles.srOnly}>ასაკობრივი ჯგუფი</legend>
        {["6-9", "10-13", "14-18"].map(value => <label key={value} className={styles.ageOption}>
          <input type="radio" name="age" value={value} checked={age === value} onChange={() => { if (age !== value) { setAge(value); setSelectedThemes([]); } }} />
          <span>{value}</span>
        </label>)}
      </fieldset>
      <Button size="large" disabled={!age} onClick={continueToTopics}>{labelText("გაგრძელება")} <Icon name="chevronsRight" /></Button>
    </dialog>
  </main>;
}
