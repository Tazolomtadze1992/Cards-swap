"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { labelText } from "../homepage-prototype/label-text";
import type { LearningActivity, LearningItem } from "./learning-content";
import { LearningShell } from "./learning-shell";
import styles from "./learning-flow.module.css";

function AnswerCards({ item, selected, review, onSelect }: {
  item: LearningItem; selected: number | undefined; review: boolean; onSelect: (value: number) => void;
}) {
  return <fieldset className={styles.answers} aria-labelledby="question-title" aria-describedby="answer-hint">
    <legend className={styles.srOnly}>{review ? "პასუხების მიმოხილვა" : "აირჩიე ერთი პასუხი"}</legend>
    {item.answers.map((answer, index) => {
      const correct = review && index === item.correctIndex;
      const incorrect = review && selected === index && !correct;
      const status = correct ? "სწორი პასუხი" : incorrect ? "შენი პასუხი — გადასახედი" : "";
      return <label className={styles.answer} key={`${item.id}-${index}`} data-state={correct ? "correct" : incorrect ? "incorrect" : selected === index ? "selected" : "default"}>
        <input type="radio" name={item.id} checked={selected === index} disabled={review} onChange={() => onSelect(index)} />
        <span className={styles.answerCopy}>{answer}{review && (status || selected === index) && <span className={styles.answerStatus}><Icon name={correct ? "check" : "close"} />{status}{correct && selected === index ? " · შენი პასუხი" : ""}</span>}</span>
      </label>;
    })}
  </fieldset>;
}

export default function LearningFlow({ activity }: { activity: LearningActivity }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<"answer" | "recommendation" | "review">("answer");
  const [skipped, setSkipped] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousView = useRef(`${stage}:${step}`);
  const item = activity.items[step];
  const selected = answers[item.id];
  const isLast = step === activity.items.length - 1;

  useEffect(() => {
    const view = `${stage}:${step}`;
    if (previousView.current === view) return;
    previousView.current = view;
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest("section")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [step, stage]);

  function next() {
    if (stage === "answer" && selected === undefined) return;
    if (isLast) setStage("recommendation");
    else setStep(step + 1);
  }

  return <LearningShell kind={activity.kind} title={activity.title} current={step + 1} total={activity.items.length} stage={stage}>
    {stage === "recommendation" ? <section className={styles.recommendation}>
      <h1 ref={heading} tabIndex={-1}>გახსოვდეს</h1>
      <p>{activity.recommendation}</p>
      <div className={styles.actions}>
        <Button asChild variant={skipped ? "primary" : "subtle"}><Link href="/prototypes/learning/practice">{labelText("პრაქტიკის არჩევა")}</Link></Button>
        {!skipped && <Button onClick={() => { setStep(0); setStage("review"); }}>{labelText("პასუხების მიმოხილვა")}<Icon name="chevronsRight" /></Button>}
      </div>
    </section> : <section className={styles.question}>
      {item.context && <div id="scenario-context" className={styles.story}>
        <p className={styles.eyebrow}>{labelText(step === 0 ? "რა მოხდა?" : "ამბავი გრძელდება")}</p>
        {item.context.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>}
      <h1 id="question-title" aria-describedby={item.context ? "scenario-context" : undefined} className={styles.questionTitle} ref={heading} tabIndex={-1}>{item.question}</h1>
      <p id="answer-hint" className={styles.hint}>{stage === "review" ? "შენი პასუხი და განმარტება" : "აირჩიე ერთი პასუხი. განმარტებებს ბოლოს ნახავ."}</p>
      <AnswerCards item={item} selected={selected} review={stage === "review"} onSelect={value => setAnswers({ ...answers, [item.id]: value })} />
      {stage === "review" && <div className={styles.feedback} data-correct={selected === item.correctIndex}>
        <span className={styles.feedbackIcon}><Icon name={selected === item.correctIndex ? "check" : "close"} size="medium" /></span>
        <div><p className={styles.feedbackTitle}>{selected === item.correctIndex ? "სწორია" : "მოდი, გადავხედოთ"}</p><p>{item.explanation}</p></div>
      </div>}
      <div className={styles.actionArea}>
        <Separator />
        <div className={styles.actions}>
          {stage === "answer" ? <Button variant="subtle" onClick={() => { setSkipped(true); setStage("recommendation"); }}>{labelText(activity.kind === "quiz" ? "ქვიზის გამოტოვება" : "სცენარის გამოტოვება")}</Button> : <Button variant="subtle" disabled={step === 0} onClick={() => setStep(step - 1)}>{labelText("წინა პასუხი")}</Button>}
          {stage === "review" && isLast ? <Button asChild><Link href="/prototypes/learning/practice">{labelText("დასრულება")}<Icon name="check" /></Link></Button> : <Button disabled={stage === "answer" && selected === undefined} onClick={next}>{labelText(stage === "review" ? "შემდეგი პასუხი" : isLast ? "რეკომენდაციის ნახვა" : "გაგრძელება")}<Icon name="chevronsRight" /></Button>}
        </div>
      </div>
    </section>}
  </LearningShell>;
}
