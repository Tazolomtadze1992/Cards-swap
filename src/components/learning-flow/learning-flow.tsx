"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Questionnaire } from "../ui/questionnaire";
import { useQuestionnaire } from "../ui/use-questionnaire";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { ActionRow } from "../ui/action-row";
import { labelText } from "../homepage-prototype/label-text";
import type { LearningActivity } from "./learning-content";
import { LearningEnding } from "./learning-ending";
import { LearningShell } from "./learning-shell";
import styles from "./learning-flow.module.css";
import { ExplainedText } from "../ui/explained-text";

export default function LearningFlow({ activity, immediateFeedback = false }: { activity: LearningActivity; immediateFeedback?: boolean }) {
  const { step, answers, selected, isLast, setStep, selectAnswer } = useQuestionnaire(activity.items);
  const contextId = useId();
  const [stage, setStage] = useState<"answer" | "recommendation" | "review-index" | "review">("answer");
  const [skipped, setSkipped] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousView = useRef(`${stage}:${step}`);
  const item = activity.items[step];
  const showFeedback = stage === "review" || (immediateFeedback && stage === "answer" && selected !== undefined);

  useEffect(() => {
    const view = `${stage}:${step}`;
    if (previousView.current === view) return;
    previousView.current = view;
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest("main")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [step, stage]);

  function next() {
    if (stage === "answer" && selected === undefined) return;
    if (isLast) setStage("recommendation");
    else setStep(step + 1);
  }

  return <LearningShell young={immediateFeedback} kind={activity.kind} current={step + 1} total={activity.items.length} stage={stage}>
    {stage === "recommendation" ? <LearningEnding young={immediateFeedback} activity={activity} answers={answers} skipped={skipped} heading={heading} onReview={() => setStage("review-index")} /> : stage === "review-index" ? <section className={styles.reviewOverview}>
      <h1 ref={heading} tabIndex={-1}>სწორი პასუხები</h1>
      <p>აირჩიე კითხვა და ნახე სწორი პასუხი.</p>
      <div className={styles.reviewGrid}>
        {activity.items.map((entry, index) => {
          const correct = answers[entry.id] === entry.correctIndex;
          return <button type="button" key={entry.id} data-correct={skipped ? undefined : correct} aria-label={`კითხვა ${index + 1}${skipped ? "" : correct ? " — სწორია" : " — გადასახედი"}`} onClick={() => { setStep(index); setStage("review"); }}>
            <span>{index + 1}</span>{!skipped && <Icon name={correct ? "check" : "close"} />}
          </button>;
        })}
      </div>
      <ActionRow spacing="airy" align="center"><Button onClick={() => setStage("recommendation")}>{labelText("უკან დაბრუნება")}</Button></ActionRow>
    </section> : <Questionnaire
      question={item.question} choices={item.answers} value={skipped ? undefined : selected}
      onValueChange={selectAnswer} correctIndex={showFeedback ? item.correctIndex : undefined}
      headingRef={heading} describedBy={item.context ? contextId : undefined}
      beforeQuestion={<>
      {stage === "review" && <div className={styles.reviewBack}><Button size="compact" variant="subtle" onClick={() => setStage("review-index")}>{labelText("ყველა პასუხი")}</Button></div>}
      {item.context && <div id={contextId} className={styles.story}>
        <p className={styles.eyebrow}>{labelText(step === 0 ? "რა მოხდა?" : "ამბავი გრძელდება")}</p>
        {item.context.map(paragraph => <p key={paragraph}><ExplainedText>{paragraph}</ExplainedText></p>)}
      </div>}
      </>}
    >
      {showFeedback && <div className={styles.feedback} role="status" data-correct={skipped || selected === item.correctIndex}>
        <span className={styles.feedbackIcon}><Icon name={skipped || selected === item.correctIndex ? "check" : "close"} size="medium" /></span>
        <div><p className={styles.feedbackTitle}>{skipped ? "განმარტება" : selected === item.correctIndex ? "სწორია" : "მოდი, გადავხედოთ"}</p>{immediateFeedback && stage === "answer" && <p>სწორი პასუხი: {item.answers[item.correctIndex]}</p>}<p><ExplainedText>{item.explanation}</ExplainedText></p></div>
      </div>}
      <ActionRow spacing={stage === "answer" ? "standard" : "airy"}>
          {stage === "answer" ? <Button variant="subtle" onClick={() => { setSkipped(true); setStage("recommendation"); }}>{labelText(activity.kind === "quiz" ? "ქვიზის გამოტოვება" : "სცენარის გამოტოვება")}</Button> : <Button variant="subtle" disabled={step === 0} onClick={() => setStep(step - 1)}>{labelText("წინა პასუხი")}</Button>}
          {stage === "review" && isLast ? <Button onClick={() => setStage("recommendation")}>{labelText("უკან დაბრუნება")}<Icon name="chevronsRight" /></Button> : <Button disabled={stage === "answer" && selected === undefined} onClick={next}>{labelText(stage === "review" ? "შემდეგი პასუხი" : isLast ? "დასრულება" : "გაგრძელება")}<Icon name="chevronsRight" /></Button>}
      </ActionRow>
    </Questionnaire>}
  </LearningShell>;
}
