# Separator v1

Shared `src/components/ui/separator.tsx` adapts shadcn's Radix Separator, replacing its visual classes with the prototype's border tokens. Horizontal separators are exactly 1px tall; vertical separators are exactly 1px wide. No thickness or style override is exposed. `tone="subtle"` uses `--color-separator-subtle`; `tone="inverse"` uses `--color-border-inverse`. Layout wrappers own width and spacing.

Replaced section dividers on Resources, Learning, Glossary, and Articles, Glossary entry rules, the resource-preview note rule, and prototype-switcher rules. The Article divider changed from 2px to 1px. Existing 1px divider spacing and colors were retained. Glossary entries keep their separator inside the definition so the definition-list structure remains valid.

Separators are decorative by default, avoiding repeated screen-reader announcements. Radix orientation and `decorative={false}` remain available for meaningful separators. Input/card borders and the unused legacy prototype are outside this separator extraction.

Verified all horizontal usages at 1280px and 390px: every rendered separator measured 1px. Checked green Glossary tone coverage and preview-note dividers. TypeScript, ESLint, production build, and diff whitespace checks passed. Evidence: `/tmp/separator-audit/`. No deployment.

Cream-surface separators use a dedicated lighter warm neutral, preserving the 1px thickness and inverse tone.

| Before | After |
| --- | --- |
| `oklch(0.9 0.01 80.708)` | `oklch(0.935 0.01 80.708)` |
