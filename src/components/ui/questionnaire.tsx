"use client";

import { useId, type ReactNode, type Ref } from "react";
import { Icon } from "./icon";
import styles from "./questionnaire.module.css";

type ChoiceProps = {
  choices: readonly string[];
  value?: number;
  onValueChange: (value: number) => void;
  correctIndex?: number;
};

export function AnswerChoices({ choices, value, onValueChange, correctIndex, labelledBy }: ChoiceProps & { labelledBy: string }) {
  const name = useId();
  const review = correctIndex !== undefined;
  return <fieldset className={styles.answers} aria-labelledby={labelledBy}>
    <legend className={styles.srOnly}>{review ? "პასუხების მიმოხილვა" : "აირჩიე ერთი პასუხი"}</legend>
    {choices.map((answer, index) => {
      const correct = review && index === correctIndex;
      const incorrect = review && value === index && !correct;
      return <label className={styles.answer} key={index} data-state={correct ? "correct" : incorrect ? "incorrect" : value === index ? "selected" : "default"}>
        <input type="radio" name={name} value={index} checked={value === index} disabled={review} onChange={() => onValueChange(index)} />
        <span className={styles.answerCopy}>{answer}{correct && <span className={styles.answerStatus}><Icon name="check" />სწორი პასუხი{value === index ? " · შენი პასუხი" : ""}</span>}</span>
      </label>;
    })}
  </fieldset>;
}

export function Questionnaire({ question, headingRef, describedBy, beforeQuestion, children, ...choices }: ChoiceProps & {
  question: string;
  headingRef?: Ref<HTMLHeadingElement>;
  describedBy?: string;
  beforeQuestion?: ReactNode;
  children?: ReactNode;
}) {
  const titleId = useId();
  return <section className={styles.question}>
    {beforeQuestion}
    <h1 id={titleId} aria-describedby={describedBy} className={styles.questionTitle} ref={headingRef} tabIndex={-1}>{question}</h1>
    <AnswerChoices {...choices} labelledBy={titleId} />
    {children}
  </section>;
}
