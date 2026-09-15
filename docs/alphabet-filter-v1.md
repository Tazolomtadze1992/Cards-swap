# Alphabet filter

`src/components/ui/alphabet-filter.tsx` adapts shadcn's Radix Toggle Group Root/Item composition with multiple selection. The controlled API takes options (value/label), selected values, a change callback, an accessible label, the results element ID, and default/on-brand appearance. No usage-level className or style overrides are exposed.

The component owns the 44px circles, typography tokens, responsive grid, hover/selected/focus/disabled styling, and keyboard navigation. Glossary retains its data, search predicate, selected values, and reset behavior. Arrow keys move between letters; Space toggles them. Selected letters keep their selected colors while hovered.

Verified selection, deselection, result groups, keyboard navigation, reset, and green appearance in the browser. Initial screenshots were pixel-identical to the previous control at 1280px, 877px, and 390px. TypeScript, lint, and diff whitespace checks passed. Evidence: `/tmp/alphabet-audit/`.
