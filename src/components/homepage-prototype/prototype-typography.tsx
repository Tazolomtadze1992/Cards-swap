"use client";

import type { ReactNode } from "react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

type TypographyTunerProps = {
  children: ReactNode;
};

export function PrototypeTypographyTuner({ children }: TypographyTunerProps) {
  const type = useDialKit("Typography", {
    display: { size: [64, 40, 120, 1], line: [64, 44, 132, 1] },
    h1: { size: [56, 32, 96, 1], line: [72, 36, 108, 1] },
    h2: { size: [40, 24, 72, 1], line: [44, 28, 84, 1] },
    h3: { size: [24, 18, 48, 1], line: [32, 22, 60, 1] },
    h4: { size: [20, 16, 40, 1], line: [28, 20, 48, 1] },
    body: {
      size: [16, 14, 24, 1],
      line: [24, 18, 36, 1],
      tracking: [0, -0.5, 1, 0.1],
      weight: { type: "select", default: "400", options: ["400", "500", "600", "700"] },
    },
    bodySmall: {
      size: [14, 12, 20, 1],
      line: [20, 16, 28, 1],
      tracking: [0, -0.5, 1.2, 0.1],
      weight: { type: "select", default: "400", options: ["400", "500", "600", "700"] },
    },
    label: {
      size: [14, 12, 20, 1],
      line: [20, 16, 28, 1],
      tracking: [0, -0.5, 2, 0.1],
      weight: { type: "select", default: "500", options: ["400", "500", "600", "700"] },
    },
    accordionQuestion: {
      size: [18, 16, 40, 1],
      line: [28, 20, 52, 1],
      tracking: [0, -0.5, 2, 0.1],
      weight: { type: "select", default: "500", options: ["400", "500", "600", "700"] },
      uppercase: false,
    },
  }, { id: "prototype-typography-v3", persist: true });

  const css = `@media (min-width: 761px) {
  [data-prototype-typography] {
    --type-display-size: ${type.display.size}px;
    --type-display-line: ${type.display.line}px;
    --type-h1-size: ${type.h1.size}px;
    --type-h1-line: ${type.h1.line}px;
    --type-h2-size: ${type.h2.size}px;
    --type-h2-line: ${type.h2.line}px;
    --type-h3-size: ${type.h3.size}px;
    --type-h3-line: ${type.h3.line}px;
    --type-h4-size: ${type.h4.size}px;
    --type-h4-line: ${type.h4.line}px;
    --type-body-size: ${type.body.size}px;
    --type-body-line: ${type.body.line}px;
    --type-body-weight: ${type.body.weight};
    --type-body-tracking: ${type.body.tracking}px;
    --type-body-sm-size: ${type.bodySmall.size}px;
    --type-body-sm-line: ${type.bodySmall.line}px;
    --type-body-sm-weight: ${type.bodySmall.weight};
    --type-body-sm-tracking: ${type.bodySmall.tracking}px;
    --type-label-size: ${type.label.size}px;
    --type-label-line: ${type.label.line}px;
    --type-label-weight: ${type.label.weight};
    --type-label-tracking: ${type.label.tracking}px;
    --type-accordion-question-size: ${type.accordionQuestion.size}px;
    --type-accordion-question-line: ${type.accordionQuestion.line}px;
    --type-accordion-question-weight: ${type.accordionQuestion.weight};
    --type-accordion-question-tracking: ${type.accordionQuestion.tracking}px;
    --type-accordion-question-transform: ${type.accordionQuestion.uppercase ? "uppercase" : "none"};
  }
}`;

  return <div
    data-prototype-typography
    data-accordion-question-uppercase={type.accordionQuestion.uppercase}
  >
    <style>{css}</style>
    {children}
    <DialRoot position="bottom-right" theme="dark" productionEnabled />
  </div>;
}
