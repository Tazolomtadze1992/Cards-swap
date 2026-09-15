# SearchField v1

The Glossary now uses a shared SearchField based on [shadcn Input Group](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/input-group.tsx) (MIT). No dependency or default shadcn theme was added.

## Ownership

- `src/components/ui/input-group.tsx` / `input-group.module.css`: group, native input, icon/button addons, input-local clear button, and token-based styling. The input precedes addons in the DOM; CSS positions the icon first. Clicking the icon focuses the input.
- `src/components/ui/search-field.tsx`: controlled SearchField with required value, onValueChange, label, and clearLabel; optional placeholder, native input attributes, and `appearance="default" | "on-brand"`. No className/style overrides. Clear changes only the query and returns focus to the input; disabled/read-only inputs cannot be cleared through this control.
- Glossary page: query state, NFKC/Georgian lowercase normalization, term/definition matching, letter filters, results/status, and global reset remain unchanged.

| Before | After |
| --- | --- |
| Search markup, input ref, and clear behavior inside Glossary | Shared SearchField owns the field and focus behavior |
| Search visuals mixed into Glossary CSS | Token-based Input Group stylesheet with default/on-brand appearances |
| Input only had its accessible label | Named search landmark and explicit aria-controls relationship to results |
| Static decorative search icon | Same icon and layout, now with Input Group's click-to-focus behavior |

Preserved 48px minimum height, pill radius, 16px side padding, 12px gaps, 24px search icon, 32×40px clear control, typography, placeholder colors, and contextual focus outlines. The clear action remains local to the input instead of introducing a new standalone Button variant. No suggestions, debounce, dropdown, backend search, or animation was added.

## Verification

All eight captured viewports matched pixel-for-pixel: 1280 and 390px, cream and green, empty and filled. Group/input/icon/clear dimensions, position, colors, font, and focus outline also matched baseline measurements.

Browser checks passed for both appearances at both widths: term/definition results, Georgian uppercase and surrounding whitespace normalization, no-results state, whitespace-only queries, query-only clear preserving selected letters, global reset, Enter without navigation, keyboard clear, focus restoration, icon focus, viewport fit, result announcements, and aria-controls. No browser runtime errors.

TypeScript, ESLint, production build, existing label-text tests, and whitespace checks passed. Evidence is in `/tmp/search-audit/`. Existing unrelated Glossary changes and earlier component work remain intact. Local implementation only; no deployment.
