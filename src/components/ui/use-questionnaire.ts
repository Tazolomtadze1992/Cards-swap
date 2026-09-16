"use client";

import { useState } from "react";

// Learning-specific completion, scoring and skipping remain in the containing flow.
export function useQuestionnaire(items: readonly { id: string }[]) {
  const [step, updateStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const item = items[step];
  function setStep(index: number) {
    updateStep(Math.max(0, Math.min(index, items.length - 1)));
  }
  function selectAnswer(value: number) {
    if (item) setAnswers(previous => ({ ...previous, [item.id]: value }));
  }
  return { step, setStep, answers, selectAnswer, selected: item ? answers[item.id] : undefined, isLast: step === items.length - 1 };
}
