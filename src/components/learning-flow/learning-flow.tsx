"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { play, setEnabled } from "cuelume";
import { Questionnaire } from "../ui/questionnaire";
import { useQuestionnaire } from "../ui/use-questionnaire";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { ActionRow } from "../ui/action-row";
import { labelText } from "../homepage-prototype/label-text";
import type { LearningActivity } from "./learning-content";
import { LearningEnding } from "./learning-ending";
import { LearningShell } from "./learning-shell";
import { LearningExitDialog } from "./learning-exit-dialog";
import styles from "./learning-flow.module.css";
import { ExplainedText } from "../ui/explained-text";

const soundPreferenceKey = "learning-feedback-sound";
const soundPreferenceEvent = "learning-feedback-sound-change";
let soundPreferenceFallback = true;

function readSoundPreference() {
  try {
    const saved = window.localStorage.getItem(soundPreferenceKey);
    return saved === null ? soundPreferenceFallback : saved !== "off";
  } catch {
    return soundPreferenceFallback;
  }
}

function subscribeSoundPreference(onChange: () => void) {
  window.addEventListener(soundPreferenceEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(soundPreferenceEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function LearningFlow({ activity, immediateFeedback = false }: { activity: LearningActivity; immediateFeedback?: boolean }) {
  const { step, answers, selected, isLast, setStep, selectAnswer } = useQuestionnaire(activity.items);
  const contextId = useId();
  const [stage, setStage] = useState<"answer" | "recommendation" | "review-index" | "review">("answer");
  const [skipped, setSkipped] = useState(false);
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});
  const [exitOpen, setExitOpen] = useState(false);
  const soundEnabled = useSyncExternalStore(subscribeSoundPreference, readSoundPreference, () => true);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousView = useRef(`${stage}:${step}`);
  const item = activity.items[step];
  const answerConfirmed = confirmed[item.id] === true;
  const showFeedback = stage === "review" || (immediateFeedback && stage === "answer" && answerConfirmed);

  useEffect(() => {
    const view = `${stage}:${step}`;
    if (previousView.current === view) return;
    previousView.current = view;
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest("main")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [step, stage]);

  useEffect(() => {
    if (!immediateFeedback) return;
    setEnabled(soundEnabled);
    return () => setEnabled(true);
  }, [immediateFeedback, soundEnabled]);

  function toggleSound() {
    soundPreferenceFallback = !soundEnabled;
    try {
      window.localStorage.setItem(soundPreferenceKey, soundPreferenceFallback ? "on" : "off");
    } catch {
      // The control still works when storage is blocked.
    }
    window.dispatchEvent(new Event(soundPreferenceEvent));
  }

  function next() {
    if (stage === "answer" && (selected === undefined || (immediateFeedback && !answerConfirmed))) return;
    if (isLast) setStage("recommendation");
    else setStep(step + 1);
  }

  function confirmOrNext() {
    if (stage === "answer" && immediateFeedback && !answerConfirmed) {
      if (selected !== undefined) {
        setConfirmed(previous => ({ ...previous, [item.id]: true }));
        if (soundEnabled) play(selected === item.correctIndex ? "success" : "error", { volume: 0.35 });
      }
      return;
    }
    next();
  }

  return <><LearningShell young={immediateFeedback} kind={activity.kind} current={step + 1} total={activity.items.length} stage={stage} soundEnabled={soundEnabled} onToggleSound={toggleSound} onCloseReview={() => setStage("review-index")} onRequestExit={() => setExitOpen(true)}>
    {stage === "recommendation" ? <LearningEnding young={immediateFeedback} activity={activity} answers={answers} skipped={skipped} heading={heading} onReview={() => setStage("review-index")} /> : stage === "review-index" ? <section className={styles.reviewOverview}>
      <h1 ref={heading} tabIndex={-1}>სწორი პასუხები</h1>
      <p>აირჩიე კითხვა და ნახე სწორი პასუხი.</p>
      <div className={styles.reviewGrid}>
        {activity.items.map((entry, index) => {
          const correct = answers[entry.id] === entry.correctIndex;
          return <button type="button" key={entry.id} data-correct={skipped ? undefined : correct} aria-label={`კითხვა ${index + 1}${skipped ? "" : correct ? " — სწორია" : " — გადასახედი"}`} onClick={() => { setStep(index); setStage("review"); }}>
            <span>{index + 1}</span>{!skipped && <Image className={styles.reviewResultIcon} src={correct ? "/assets/learning/review-check.svg" : "/assets/learning/review-x-cream.svg"} width={30} height={correct ? 35 : 30} alt="" />}
          </button>;
        })}
      </div>
      <ActionRow spacing="airy" align="center"><Button onClick={() => setStage("recommendation")}>{labelText("უკან დაბრუნება")}</Button></ActionRow>
    </section> : <Questionnaire
      question={item.question} choices={item.answers} value={skipped ? undefined : selected}
      onValueChange={selectAnswer} correctIndex={showFeedback ? item.correctIndex : undefined}
      headingRef={heading} describedBy={item.context ? contextId : undefined}
      beforeQuestion={<>
      {item.context && <div id={contextId} className={styles.story}>
        <p className={styles.eyebrow}>{labelText(step === 0 ? "რა მოხდა?" : "ამბავი გრძელდება")}</p>
        {item.context.map(paragraph => <p key={paragraph}><ExplainedText>{paragraph}</ExplainedText></p>)}
      </div>}
      </>}
    >
      {showFeedback && <div className={styles.feedback} role="status" data-correct={skipped || selected === item.correctIndex}>
        {(skipped || selected === item.correctIndex) && <span className={styles.feedbackIcon}><Icon name="check" size="medium" /></span>}
        <div><p className={styles.feedbackTitle}>{skipped ? "განმარტება" : selected === item.correctIndex ? "სწორია" : "მოდი, გადავხედოთ"}</p>{immediateFeedback && stage === "answer" && <p>სწორი პასუხი: {item.answers[item.correctIndex]}</p>}<p><ExplainedText>{item.explanation}</ExplainedText></p></div>
      </div>}
      <ActionRow spacing={stage === "answer" ? "standard" : "airy"}>
          {stage === "answer" ? <Button variant="subtle" onClick={() => { setSkipped(true); setStage("recommendation"); }}>{labelText(activity.kind === "quiz" ? "ქვიზის გამოტოვება" : "სცენარის გამოტოვება")}</Button> : <Button variant="subtle" disabled={step === 0} onClick={() => setStep(step - 1)}>{labelText("წინა პასუხი")}</Button>}
          {stage === "review" && isLast ? <Button onClick={() => setStage("recommendation")}>{labelText("უკან დაბრუნება")}<Icon name="chevronsRight" /></Button> : <Button disabled={stage === "answer" && selected === undefined} onClick={confirmOrNext}>{labelText(stage === "review" ? "შემდეგი პასუხი" : stage === "answer" && immediateFeedback && !answerConfirmed ? "პასუხის დადასტურება" : isLast ? "დასრულება" : "გაგრძელება")}<Icon name="chevronsRight" /></Button>}
      </ActionRow>
    </Questionnaire>}
  </LearningShell>
    {exitOpen && <LearningExitDialog href={immediateFeedback ? "/prototypes/learning/6-9" : "/prototypes/learning"} onClose={() => setExitOpen(false)} />}
  </>;
}
