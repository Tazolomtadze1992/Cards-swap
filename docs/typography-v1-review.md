# Typography v1 prototype review

Applied to the existing active homepage, cards playground, Resources, Glossary, FAQ, Topics (both variants and age dialog), and Article routes. Services was already deleted in this checkout. Legacy unreferenced prototype styles and third-party Colors editor are outside the active product scale.

Typography changes only: colors, typefaces, margins, padding, widths, card geometry, illustrations, and animation remain as they were. Mobile type switches at 760px; existing layout breakpoints remain unchanged. The current desktop-first revision sets Display to 64px, tries H1 at 56px, sets H2 to 40px, uppercases Label presentation, and promotes resource/topic card titles to H3. See typography-v1-changes.md for the selector inventory.

| Role | Desktop size / line / weight | Mobile size / line / weight |
| --- | --- | --- |
| Display | 64 / 64 / 700 | 40 / 48 / 700 |
| H1 | 56 / 72 / 700 | 32 / 40 / 700 |
| H2 | 40 / 44 / 700 | 28 / 36 / 700 |
| H3 | 24 / 32 / 600 | same |
| H4 | 20 / 28 / 600 | same |
| Body | 16 / 24 / 400 | same |
| Body Small | 14 / 20 / 400 | same |
| Label | 14 / 20 / 600, uppercase | same |

## Visual findings

Reviewed at 1440px desktop and 390px mobile.

| Screen | Assessment | Candidate adjustment, not applied |
| --- | --- | --- |
| Homepage hero | Desktop Display is now 64/64 from the live DialKit tuning pass. Mobile remains at the previous 40/48 value. | Reassess desktop spacing only after reviewing the new 64px hero in context. |
| Homepage category section | 32px section title feels modest above the large spread of cards. 24px card titles are readable at mobile width. Existing overlapping desktop cards still obscure parts of neighboring titles. | Review heading prominence; card overlap is retained layout behavior. |
| Resources | Desktop H1 is now 56/72. Video and document card titles are promoted to H3 at 24/32, matching the homepage card title scale. Labels/badges are uppercase. | Review whether longer Georgian titles still feel comfortable at 24px on narrower desktop widths. |
| Glossary | 16/24 definitions read comfortably; long desktop lines remain due to the existing column width. 14px alphabet glyphs look slightly small inside 44px circles, though targets remain large. | Consider Body for alphabet letters. Keep definition size. |
| FAQ | Desktop 20/28 questions have a clear hierarchy. Mobile questions wrap into 3–5 lines within the retained 32px side padding, making rows tall and heavy. | Revisit mobile question typography or row padding. Avoid shrinking all H4 titles to solve this one case. |
| Topics | Card titles, including the alternate decorative variant, are now H3 at 24/32. Label controls are uppercase. | Review the longer topic titles in variant 2; a few become visually heavier, which may be desirable for cards. |
| Age dialog | 24px age ranges work well on mobile but look modest in the large desktop tiles. 14px Continue label looks small in its 96px desktop button. | Consider a more prominent semantic treatment for large choice tiles / primary action, or revisit their container sizes. |
| Article | 40/32px page title and 32/28px section headings improve hierarchy. 16/24 body is comfortable on mobile; desktop reading column is relatively wide. The 14px next-action label feels small in the existing oversized button. | Retain body size initially; assess reading width and prominent action treatment separately. |
| Shared navigation | 14px improves mobile readability compared with 11px. Links wrap into two rows on inner pages and three on the homepage at 390px. | Retain 14px; revisit navigation layout only if height is a concern. |

## Font limitation

Cards Hakuna is supplied only as a regular OTF. CSS requests 600/700 as agreed, but font-synthesis remains disabled to preserve the actual typeface. Its glyph outlines therefore remain the supplied regular design. Real semibold/bold font assets are needed to verify actual 600/700 rendering; do not interpret computed CSS weights as proof of those assets.

## Verification

Production build and TypeScript passed. ESLint passed. Browser inspection confirmed the latest desktop values on Homepage, Resources, Learning variant 2, and the standalone Cards prototype: homepage Display 64/64, inner-page H1 56/72, H2 40/44, resource/topic card titles 24/32, labels uppercase, DialKit hidden on homepage, and DialKit still visible on the standalone card prototype. This does not certify every possible narrow viewport or every interaction state.

Existing image aspect-ratio warnings were observed. Opening native FAQ details before hydration produced a development hydration warning; no component markup or interaction logic was changed for this typography pass.
