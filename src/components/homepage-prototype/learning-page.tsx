"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown, ChevronsRight, X } from "lucide-react";
import { SiteHeader } from "./homepage-sections";
import { learningTopics } from "./learning-data";
import styles from "./learning.module.css";

const frameColors = ["#00cd9c", "#cc80ff", "#00b68e", "#19aeeb", "#5acc00", "#f888ff"];
const fillColors = ["#c9e7dd", "#e8c4ff", "#00cd9c", "#5ea8ff", "#9ccaed", "#aea3e3"];

export default function LearningPage() {
  const [age, setAge] = useState("");
  const [choosingAge, setChoosingAge] = useState(true);
  const [variant, setVariant] = useState<1 | 2>(1);
  const [topic, setTopic] = useState<(typeof learningTopics)[number] | null>(null);
  const ageDialog = useRef<HTMLDialogElement>(null);
  const topicDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const dialog = ageDialog.current;
    if (choosingAge) dialog?.showModal();
    else dialog?.close();
  }, [choosingAge]);
  useEffect(() => {
    if (topic) topicDialog.current?.showModal();
    else topicDialog.current?.close();
  }, [topic]);
  useEffect(() => {
    if (!choosingAge && !topic) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [choosingAge, topic]);

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
        <button className={styles.ageFilter} onClick={() => setChoosingAge(true)}>
          {age ? `${age} ასაკის ჯგუფი` : "ყველა ასაკი"}<ChevronDown size={20} aria-hidden="true" />
        </button>
        <p>ნაჩვენებია : <strong>{learningTopics.length} თემა</strong></p>
      </div>
      <div className={styles.grid} data-variant={variant}>
        {learningTopics.map((item, index) => <button key={item.id} className={styles.card}
          style={{ "--card-color": (variant === 1 ? frameColors : fillColors)[index % 6] } as CSSProperties}
          onClick={() => setTopic(item)} aria-label={`${item.title} — დაწყება`}>
          <span className={styles.cardBody}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="" width={1000} height={646} loading={index < 3 ? "eager" : "lazy"} />
            <span className={styles.cardTitle}>{item.title}</span>
          </span>
          {variant === 2 && <span className={styles.start}>დაწყება</span>}
        </button>)}
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
    <dialog ref={topicDialog} className={styles.topicDialog} aria-labelledby="topic-title" onCancel={() => setTopic(null)} onClose={() => setTopic(null)}>
      {topic && <>
        <button className={styles.close} aria-label="დახურვა" onClick={() => setTopic(null)}><X /></button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={topic.image} alt="" width={1000} height={646} />
        <h2 id="topic-title">{topic.title}</h2>
        <p>{topic.intro}</p>
      </>}
    </dialog>
  </main>;
}
