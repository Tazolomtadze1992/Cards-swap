# Handoff validation · 16 September 2026

## Automated checks

Passed against the installed dependencies:

- Full repository ESLint (`node node_modules/eslint/bin/eslint.js .`).
- TypeScript (`node node_modules/typescript/bin/tsc --noEmit`).
- Both existing label-text tests (`node --test tests/*.test.mjs`). Node emits a non-failing module-type detection warning for the TypeScript test import.
- Production build (`node node_modules/next/dist/bin/next build --webpack`), including all 17 generated pages. Dynamic article/learning routes also compiled.

The standard pnpm script launcher attempted an automatic modules reinstall and stopped because it required an interactive purge confirmation. The commands above bypassed the launcher without modifying dependencies. A clean install and production-server browser run are still outstanding.

## Browser smoke checks

Checked the running development app at port 3015 using the in-app browser. Mobile was 402 × 778; desktop was 1280 × 900. Temporary viewport overrides were reset afterwards.

| Check | Result |
| --- | --- |
| Age picker initially requires selection | Continue disabled; choosing 6–9 enables it and reaches `/learning/6-9` |
| Age picker X | Reaches homepage |
| Young scenario | Incorrect selection immediately shows correct answer/explanation; next step starts empty; correct second answer completes with 1/2 |
| Mobile result | Screenshot inspected: centered score within rounded blue arc, copy and materials below |
| Review | Numbered overview opens a retained answer; top X returns to overview |
| Desktop quiz keyboard | Space and ArrowDown select/change native radio answers; no immediate feedback for 10–13; completion displays 0/1 |
| Resource type filter | Video filter reduces 23 items to 4; Escape closes filter; reset restores 23 |
| Services dialog and definition | Overview opens; clicking the highlighted word opens its definition inside the modal; Escape closes definition, then dialog and restores trigger focus |
| Mobile menu | Full viewport screenshot inspected; body is fixed with hidden overflow; no horizontal page overflow measured while open |
| Glossary search | “ავატარი” reduces 30 entries to one matching definition |
| FAQ | First question expands to its answer |

These are representative checks, not exhaustive automation. Physical touchscreen behavior, screen-reader announcements, every breakpoint, every content entry, real downloads/playback, final phone/email destinations, and a clean-machine install have not been certified by this pass. No calls or external messages were sent. Content and integration gaps are tracked in [developer-handoff.md](developer-handoff.md).
