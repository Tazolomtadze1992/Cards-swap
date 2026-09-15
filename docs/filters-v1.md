# Shared filters v1

Learning and Resources now share filter components built on the shadcn/Radix Popover, Checkbox, and Select composition. Reference sources: [Popover](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/popover.tsx), [Checkbox](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx), [Select](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/select.tsx) (MIT).

## Component ownership

`src/components/ui/filters.tsx` and `filters.module.css` own the filter trigger, selected-count label, panel, options, indicators, chevron, focus treatment, and reset control. No Button variants or usage-level className/style overrides are involved. Pages supply labels, typed options, selected values, and callbacks; filtering predicates and result counts remain page-owned.

- `MultiSelectFilter`: Popover with labeled Radix checkboxes. Selecting options keeps the panel open. Escape returns focus; clicking outside dismisses it.
- `SelectFilter`: Radix Select for one age group. Selecting an option closes the list and returns focus. Keyboard navigation and typeahead come from Radix.
- `FilterTrigger`: shared visual control, also used to reopen Learning's existing age dialog.
- `FilterReset`: shared reset styling; Resources supplies its existing reset callback and disabled condition.

`layout="content"` retains Learning's intrinsic trigger width and 420px wrapping panel. `layout="catalogue"` retains Resources' 190px minimum trigger width, 238px minimum panel width, and full-width mobile controls. Panels use collision handling and available-height scrolling rather than extending beyond the viewport. Portals are mounted inside each filter's theme subtree so inherited font/color tokens continue to apply.

## Changes

| Before | After |
| --- | --- |
| Duplicate triggers and checkbox panels in Learning/Resources | Shared MultiSelectFilter with the existing per-context dimensions |
| Resources age radios in a manually positioned panel | SelectFilter with listbox semantics and the same round selection marker |
| Browser-native checkbox/radio visuals | Consistent token-colored Radix checkbox and Select indicators, retaining 18px sizing |
| Page-level outside-click/Escape listeners for filters | Primitive-owned dismissal and focus handling |
| Reset styling and icon local to Resources | Shared FilterReset; same label, colors, disabled opacity, and callback |
| Page-wide focus rule could override filter controls | Learning's remaining local rule targets only its WIP CTA and prototype switcher |

Preserved trigger/panel palette, typography, spacing, radius, shadow, active count text, multi-selection semantics, resource filtering/reset logic, and Learning's mandatory age-dialog flow. Kept the existing 180ms chevron transition and reduced-motion handling. No new panel animation was added. State/motion design refinement remains deferred.

## Verification

- Captured Learning and Resources at 1280×844 and 390×844 before and after, with filters closed/open. Trigger dimensions, position, color, font, and text match the baseline measurements in all eight cases. Panel differences are the deliberate Radix indicators, focus handling, and viewport collision positioning; not a claim of panel pixel identity.
- Checked resource multi-selection and all 18 individual resource-type/age combinations against the existing data predicate, including zero-result combinations.
- Checked reset, selected count, Select keyboard navigation/selection, Popover Enter/Space, Escape and focus return, outside dismissal, switching between panels, mobile bounds, Learning theme combinations, age-dialog preservation, inherited typography changes, and reduced motion.
- TypeScript, ESLint, production build, existing label-text tests, and whitespace checks passed. No browser runtime errors in the interaction checks.

Verification scripts/screenshots are in `/tmp/filter-audit/`. No deployment was performed. Earlier Button/Accordion work and existing unrelated edits remain intact.
