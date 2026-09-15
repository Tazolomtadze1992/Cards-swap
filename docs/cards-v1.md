# Card components v1

## Foundation

The resource and learning families now use a lightweight adaptation of [shadcn Card](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx) (MIT). No dependencies or theme reset were added. `src/components/ui/card.tsx` exposes structural Card, CardHeader, CardContent, CardTitle, CardDescription, and CardFooter slots. Card uses the already-installed Radix Slot for semantic article/link roots. Shared title/body typography uses existing tokens.

Card slots allow internal composition styles. Pages use the finished ResourceCard and LearningCard APIs, which do not expose className or style overrides.

## Families

| Before | After |
| --- | --- |
| ResourceCard styles lived in the Resources page stylesheet | ResourceCard owns its stylesheet and uses shared Card slots |
| Video markup was interleaved with document markup | ResourceCard dispatches to an internal VideoCard; callers retain one resource API |
| Article recommendations override card height with a page class | Explicit `context="recommendation"` owns the existing 448px minimum height and h3 hierarchy |
| Learning page constructs both card layouts inline | LearningCard owns `appearance="framed"` and `appearance="filled"` |
| Learning titles are spans | Semantic h2 card titles with identical typography and spacing |
| Badge and play-indicator styling mixed with page/media styling | ResourceBadge shares age/duration styling; VideoPlayIndicator is reused by cards and the resource preview |

ResourceCard receives the resource item and existing onOpen callback. Context defaults to `catalogue`. Resource actions and full-media video triggers keep the same destinations, callbacks, labels, and focus-return references. The video card remains a preview trigger, not a newly implemented video player.

LearningCard receives its topic, named appearance, color, and eager-image flag. The page retains palette selection and original topic indexing, so filtering does not recolor cards. Each card remains a single link, with a non-interactive ButtonSurface in the filled design.

Page-level grid layouts, recommendation counts, filters, dialogs, WIP age/scenario CTAs, and animated homepage CardDeck remain unchanged. Existing learning hover brightness, video-thumbnail hover scaling, and reduced-motion behavior were moved intact. No new motion was introduced.

## Preserved visual decisions

Spacing and radii now reference existing tokens where values match. Category backgrounds remain supplied by resource data / learning palettes. The resource ink (#20291b), framed-learning ink (#393939), translucent media pills/play surfaces, image aspect ratio, resource image sizes, and context-specific minimum heights remain component-owned to preserve the approved appearance.

## Verification

- Before/after captures: Resources, Articles, and both Learning variants at 1280, 877, and 390px (12 cases). Card text, document position, dimensions, background, padding, radius, and foreground all matched baseline measurements.
- Nine captured viewports matched pixel-for-pixel. Three desktop captures had localized thumbnail/hover differences; no blanket pixel-identity claim. Inspected rendered resource and filled-learning cards visually.
- Browser checks at desktop/mobile passed for video/document preview opening, close/Escape focus restoration, keyboard focus, recommendation navigation, 2/3/5 recommendation counts and viewport fit, both Learning appearances, one-link/no-nested-button semantics, theme filtering, and article navigation.
- Recommendation headings are h3 beneath the section heading; resource catalogue and Learning card headings are h2.
- TypeScript, ESLint, production build, existing label-text tests, and diff whitespace checks passed. Interaction checks reported no browser runtime errors.

Local verification evidence: `/tmp/card-audit/`. No deployment or unrelated-file cleanup was performed; earlier component work and pre-existing edits are preserved.
