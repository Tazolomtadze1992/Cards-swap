# Hakuna + FiraGO typography update

The existing simplified desktop/mobile size and line-height tokens, weights,
and typography tuner values are preserved. Existing unrelated work is retained.

| Before | After |
| --- | --- |
| Body stack: Inter, Noto Sans Georgian, Arial | `--font-body: "FiraGO", sans-serif`, with local WOFF2 at 400/600/700 |
| Repeated component Hakuna family literals | Components use `var(--font-display)`; global h1–h6 default to Hakuna |
| Duplicate Hakuna font-face in homepage module | Single global font-face |
| Arial on card actions and prototype switcher | `var(--font-body)` |
| FAQ H4 summaries and first learning-card variant inherited body face | Explicit heading-family token; their size tokens are unchanged |
| Controls could inherit a heading font | Controls explicitly use the UI-family token |
| Third-party typography tuner used system/monospace fonts | Scoped UI-family override |
| Label helper depended on runtime locale uppercase | Explicit Mkhedruli-to-Mtavruli mapping, covering all 46 encoded letters, idempotently |
| Every label used CSS uppercase, which changes Georgian rendering in Chrome | Shared `--type-label-transform`: `none` for Georgian and `uppercase` for English; active label rules consume it |
| English prototype switcher inherited Georgian language | `lang="en"` enables Latin CSS uppercase |
| Resource count bypassed casing helper | Both count prefix and dynamic file count use `labelText` |
| Official FiraGO lacked Mtavruli Unicode mappings | Derived fonts map all 46 existing `.case` outlines to Mtavruli; internally renamed Hub UI, CSS alias FiraGO |
| No regression coverage for casing | Unit checks for mixed text, full alphabet, idempotence, punctuation, and empty strings; reproducible font-preparation script with glyph assertions |

## Compatibility

Official FiraGO 1.001 has the desired capital outlines, but lacks direct Unicode
Mtavruli mappings. The locally generated files correct encoding only, retaining
those outlines and the OFL license. Original assets, license, and provenance
are in `public/fonts/firago/`; regeneration is in `scripts/prepare-firago.py`.

Visual QA also found Chrome displaying Georgian differently with CSS uppercase
even when DOM text was already Mtavruli. Georgian scopes now use `none`.
New Georgian labels should render `labelText(copy)` and consume the existing
label style/token. Keep content, input values, and filtering keys in natural case.
For Latin-only labels set `lang="en"` so CSS handles uppercase.

Hakuna still has only its original regular font asset. Existing 600/700 heading
role tokens are retained, with synthesis disabled; they resolve to that outline.

## Verification

- Production build, TypeScript, ESLint, and casing unit tests pass.
- Font generation verifies all 46 Mtavruli mappings at 400, 600, and 700.
- Desktop checks cover homepage, resources, glossary, FAQ, articles, and learning
  in Chrome, Firefox, and WebKit (Safari engine, not the Safari application).
- Mobile checks at 390px cover homepage, resources, glossary, FAQ, and articles:
  no horizontal page overflow; Display 40px / H1 32px retain their original values.
- Filter labels emit Mtavruli; uppercase glossary searches still return matches.
- Chrome's actual rendered-font inspection reports HubUI-SemiBold for navigation,
  HubUI-Regular for body text, and SS GEO HAKUNA for headings, all custom fonts.
- Screenshots inspected for heading/body separation and Georgian capitals;
  the tuner was hidden only for screenshots to reveal the product beneath it.

Local preview: http://localhost:3010/prototypes/homepage
