# Design-system consistency audit

Date: 2026-09-13

## Scope and verdict

This audit covers the current prototype routes, their React components, CSS modules, shared global styles, and desktop/mobile rendering. It is an extraction and rationalization pass only. No product UI, content, route, interaction, or card motion was changed.

The prototype already has the beginnings of a coherent system: the main page family shares `SiteHeader`, `FaqList`, `ResourceCard`, and `CardDeck`; the product uses one recognizable display face; filters follow a repeated visual pattern; and reduced-motion handling exists. The main problem is that those decisions are expressed as page-local CSS rather than reusable foundations.

There were also three design languages in the repository before the cleanup:

1. The active green/cream page family under `homepage-prototype` and the approved card deck.
2. The removed black/white services exploration, with Arial, square controls, hard borders, and a separate header.
3. An older, currently unreferenced `prototype.tsx` direction with its own cream/navy/brown/green tokens, 8px controls, hard shadows, and separate navigation.

The green/cream page family should be the source for the first canonical system. The low-fi services exploration was removed after this audit. Quarantine the unreferenced prototype styles from system extraction so old values do not become accidental tokens.

## Evidence: captured routes

1. **Homepage — good foundation, inconsistent scale.** Shared brand, display type, card deck, and FAQ feel related. The 80px hero, roughly 57px container-query card heading, and 68px FAQ heading are three nearby display roles without names.
2. **Learning — usable, needs normalization.** It shares the header and filter language, but its page spacing, card radii, and dialog scale are local decisions. The mobile header consumes three rows before the page title.
3. **Resources — usable, strongest reusable component base.** `ResourceCard` is already shared with Articles. Filter controls nearly duplicate Learning while using a separate implementation and slightly different sizing.
4. **Glossary — usable, visually distinct section.** Search, circular alphabet controls, reset action, and sticky filters work as a family, but their sizes and surfaces are not connected to common control tokens.
5. **FAQ — healthy shared behavior.** The same accordion data and component are used on the homepage and full page. Layout widths and page-title spacing are still page-specific.
6. **Article — healthy content layout, weak hierarchy mapping.** A 28px page `h1`, 24px section headings, 48px recommendations heading, and 96px next action make semantic element names unreliable as visual roles.
7. **Services — removed exploration.** The low-fi route and its dedicated component/styles were deleted after the audit; the shared support card remains part of the active homepage.

The desktop pass used a 1280px viewport. Mobile checks used 390 × 844. Screenshots confirm the mobile navigation wraps into two link rows below the logo/contact row on the homepage and three rows on inner pages. Screenshot evidence cannot establish full keyboard, screen-reader, zoom, or contrast compliance; those need a separate functional accessibility pass.

## Current inconsistencies

### Typography

- Global body copy declares `Inter, "Noto Sans Georgian", Arial`, the display face is declared separately in two CSS modules, and the legacy prototype controls sometimes force Arial. The removed services styles are no longer part of the active surface.
- The active page family contains at least 19 explicit `font-size` declarations before counting `font` shorthands and container-query sizes. Common values are 14, 16, and 18px, but headings and responsive overrides include 22, 24, 26, 28, 32, 38, 40, 42, 44, 46, 48, 64, 68, and 80px.
- Identical roles drift by page: mobile page titles are 40px on Learning, 44px on Glossary, 46px on Resources, and 42px on FAQ.
- The main suite mostly uses weights 400, 600, and 700. The older unreferenced prototype adds 520, 560, 650, and 750, which should not enter the new scale.
- Line-height mixes unitless ratios and fixed pixels. Body copy appears as 16/24, 17/1.7, 18/28, and 18/1.8 without named reading contexts.

### Spacing

- Desktop horizontal gutters vary between 24, 31, and 32px. Mobile mostly uses 20px, while some containers use 24px or 12px-derived widths.
- Similar page intros use 100, 110, 125, 133, 142, or 150px top spacing and 80, 96, 120, 140, 150, 160, 176, or 240px bottom spacing.
- Repeated layout gaps use 10, 12, 16, 20, 24, 28, 30, 32, 40, 48, 56, 64, 80, 82, 88, 96, 100, and 120px. Several are legitimate composition values, but they currently have no distinction from reusable spacing.
- Exact decimal dimensions and `cqw` values in `CardDeck` are Figma/motion geometry. They are intentional exceptions and should remain component-private.

### Color

- The active page family and its data files contain 61 distinct hex literals when alpha variants and card palettes are included.
- The most repeated product values are `#faf4ea` (canvas), `#005c53` (brand surface), `#5a3a00` (brown action/text), `#20291b` (dark text), `#00384b` (focus/card heading), and `#5ea8ff` (action/accent). They are hardcoded throughout page modules.
- `globals.css` exposes cream/navy/brown/green/blue tokens from the older unused direction, but most active pages bypass them. The current global tokens therefore suggest a system that the current product does not use.
- Near-duplicates obscure intent: `#faf4ea`, `#fdf9ed`, `#fffdf7`, `#fffefd`, and `#fffbf2` are all warm light surfaces; `#151515`, `#20291b`, `#393939`, `#4b4b4b`, and `#000` are all dark text/surface values.
- Alpha colors are encoded both as short hex (`#0003`, `#0006`) and eight-digit literals (`#00000026`, `#ffffff40`), so the same conceptual overlay/pill treatment has no shared name.

### Corner radii

- The active suite uses 15 distinct radius declarations: 8, 10, 12, 16, 18, 20, 24, 30, 32, 56px, `50%`, `999px`, inherited/zero, and the card deck's responsive `cqw` radius.
- Pills are consistent at `999px`, and circular controls consistently use `50%`; these are healthy functional primitives.
- Menus use 18px, FAQ rows 20px, resource cards 24px, learning cards 24 or 32px, and the age dialog 56px. The values are plausible individually but lack named tiers.

### Shadows and elevation

- The active suite has two real elevation treatments: `0 18px 55px #5a3a0030` for menus and `0 24px 80px #0006` for the preview dialog. The prototype switcher has an inset outline.
- The old direction includes several 3–7px hard shadows and another set of soft shadows. Those values should remain outside the canonical system.

### Layout and containers

- `1440px` is already the dominant outer shell and should become the canonical wide container.
- Inner widths are chosen per screen: 1376px recommendations, 1239/1191/909px FAQ widths, 765px article measure, 741/700px title blocks, and 560px overlays. Some are real content measures; others are Figma frame remnants.
- Breakpoints are fragmented across 600, 640, 720, 760, 1050, 1100, and 1200px. This makes shared components change at different points.
- Page headers share markup in the main suite but do not own a fixed height or mobile behavior. Their padding creates the height indirectly.

### Navigation

- The active suite correctly reuses `SiteHeader`, but the item set changes: inner pages add “Home” and remove “Support services,” while the homepage does the reverse. Contact also changes surface color by page context.
- At 390px, the header preserves every desktop link and wraps them into multiple centered rows. This is readable but consumes substantial vertical space and makes the primary page content start lower on every inner page.
- The removed services prototype had a separate 72px text-only header and did not use the shared logo, navigation, contact action, or active-state treatment.
- The root route is the cards playground, so it intentionally has no product navigation. Keep that distinction explicit in routing/docs rather than trying to normalize it into the site shell.

### Repeated component patterns

Good existing reuse:

- `SiteHeader` across Homepage, Learning, Resources, Glossary, FAQ, and Articles.
- `ResourceCard` across Resources and Articles.
- `FaqList` across Homepage and FAQ.
- `CardDeck` across the cards playground and Homepage; its approved animation is isolated in its own module.

Highest-value missing reuse:

- Learning and Resources duplicate filter trigger, active state, chevron rotation, popover, option row, and focus treatment.
- Page intro/title, wide content container, toolbar/count/divider, pill/tag, icon button, and empty state repeat with small deviations.
- CTA/link buttons use the same pill shape but heights range from 44 to 96px and padding varies by page.
- The current `SiteHeader` API uses five booleans to infer the active page. A single active-route value and explicit theme would be easier to keep consistent.

## Recommended canonical foundations

These tokens rationalize the current green/cream product; they do not introduce a new visual direction.

### Color roles

| Token | Existing value | Use |
| --- | --- | --- |
| `color.canvas` | `#faf4ea` | Default page background |
| `color.canvas.subtle` | `#fdf9ed` | Dialog/soft alternate canvas |
| `color.surface` | `#fffdf7` | Menus and raised light surfaces |
| `color.brand` | `#005c53` | Primary brand surface and text |
| `color.brand.strong` | `#00403a` | Strong brand text/action state |
| `color.text` | `#20291b` | Default readable dark text |
| `color.text.muted` | choose one tested solid value near `#737373` | Secondary text; do not encode meaning with arbitrary alpha |
| `color.accent` | `#5ea8ff` | Current blue action/selection accent |
| `color.focus` | `#00384b` on light, `#faf4ea` on brand | Focus rings by surface |
| `color.danger` | `#cc3033` | Destructive/reset emphasis |
| `color.danger.soft` | current `#ffcfcf80`, converted to a named composited surface | Disabled/reset background |
| `color.overlay.soft` | current 20% black treatment | FAQ rows and quiet pills |
| `color.overlay.strong` | current 40% black treatment | Card actions and modal backdrop family |

Keep category/card colors as a separate `color.category.*` palette. They carry content identity and should not be mixed into structural UI tokens.

### Typography roles

| Role | Family | Size / line height | Weight |
| --- | --- | --- | --- |
| `label.xs` | body | 12 / 16 | 700 |
| `label.sm` | body | 14 / 20 | 600 or 700 |
| `body.md` | body | 16 / 24 | 400 |
| `body.lg` | body | 18 / 28 | 400 |
| `display.sm` | Cards Hakuna | 24 / 28 | 400 |
| `display.md` | Cards Hakuna | 32 / 36 | 400 |
| `display.mobile` | Cards Hakuna | 40 / 44 | 400 |
| `display.lg` | Cards Hakuna | 48 / 52 | 400 |
| `display.xl` | Cards Hakuna | 64 / 64 | 400 |
| `display.hero` | Cards Hakuna | 80 / 80 | 400 |

Use three body weights: 400, 600, and 700. Map current 26–28px headings to `display.sm` or `display.md` according to hierarchy; map 34–36px and the 38–46px mobile cluster to `display.md`/`display.mobile`. Keep container-query type inside `CardDeck` as a component-specific responsive formula.

### Spacing, size, radius, and elevation

- Spacing: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160px`.
- Control heights: `44px` compact, `48px` default, `52px` prominent. Keep 68/72/96px only for deliberately oversized calls to action, expressed as component variants.
- Radii: `8px` small, `12px` media/control, `16px` raised surface, `20px` row, `24px` card/modal, `32px` expressive card, `56px` age-dialog exception, plus `pill: 999px` and `round: 50%`.
- Elevation: `none`, `popover: 0 18px 55px rgb(90 58 0 / 19%)`, `modal: 0 24px 80px rgb(0 0 0 / 40%)`. Keep hard-offset shadows scoped to a selected visual direction.
- Containers: `wide: 1440px` with 32px desktop / 20px mobile gutters; `content: 1200–1232px`; `reading: 48rem` (approximately the current 765px article); `dialog: 560px`.
- Responsive breakpoints: consolidate page behavior around 640px (phone), 768px (large phone/small tablet), 1050px (grid), and 1200px (navigation/wide layout). Components may keep a private exception when content proves it is needed.

## Component normalization priorities

1. **Define scope and foundations.** Treat `homepage-prototype` plus `cards-prototype` as the current product baseline. Add semantic variables and typography/layout utilities without changing rendered values. Keep the unreferenced prototype outside the system.
2. **Normalize `SiteHeader` and responsive navigation.** Give it explicit light/brand themes, one active-route prop, canonical shell/gutters, and a compact mobile menu. Preserve the current route labels and destinations.
3. **Extract the shared filter system.** One `FilterTrigger`, `FilterPopover`, option-row pattern, clear action, result count, and toolbar can serve Learning and Resources. Glossary can reuse the same control sizes and focus tokens while keeping its distinct alphabet UI.
4. **Normalize page structure.** Create `PageShell`, `PageIntro`, `ContentContainer`, `ReadingContainer`, and `SectionHeading` roles. This removes most 100–160px one-offs without flattening page composition.
5. **Normalize actions and feedback.** Introduce button/link variants for compact/default/prominent, icon-only, quiet, brand, and danger treatments. Standardize disabled, hover, active, and focus-visible states.
6. **Consolidate card families.** Keep `CardDeck` isolated. Document `ResourceCard` and Learning-card variants with shared padding/radius/type tokens where their structures overlap.
7. **Resolve legacy code.** The low-fi services prototype is removed. Remove the unused legacy `prototype.tsx` and its CSS only after confirming it is no longer needed.

## Phased cleanup plan

### Phase 0 — freeze and protect

- Capture reference screenshots for every route at desktop and 390px.
- Record the approved CardDeck behavior: 600ms hover/return, 650ms click, 1.45 expanded scale, existing easing, focus behavior, Escape behavior, and reduced-motion behavior.
- Classify values as system, composition, content palette, or component-private geometry before replacing anything.

### Phase 1 — additive foundations

- Replace the misleading legacy globals with semantic aliases for the active palette, type roles, spacing, radii, containers, breakpoints, focus, and elevation.
- Initially map CSS declarations to tokens at the same rendered values. Do not visually tune pages in this phase.
- Move the `Cards Hakuna` face declaration to one global font source.

### Phase 2 — shell and navigation

- Normalize the outer 1440px shell, 32/20px gutters, page intro roles, and reading width.
- Refactor `SiteHeader` to route/theme props and implement the compact mobile navigation pattern.
- Keep the cards-only root/playground outside the product shell.

### Phase 3 — controls and repeated components

- Merge Learning/Resources filter primitives.
- Normalize buttons, pills, icon buttons, menus, empty states, counts, and focus/disabled states.
- Apply the same tokens to Glossary controls without changing its information architecture.

### Phase 4 — content and card families

- Map headings and body copy to named typography roles.
- Normalize Resource/Article card padding and type. Keep category colors data-driven.
- Reduce page-local radii and spacing overrides only where visual comparison shows no regression.

### Phase 5 — verification, then motion system

- Compare every route against Phase 0 screenshots at desktop, tablet, and mobile.
- Test keyboard order, visible focus, zoom/reflow, touch targets, dialogs, accordions, filters, and color contrast separately; screenshots alone are insufficient.
- After static foundations are stable, define motion duration/easing/spring tokens. Adopt the approved card choreography as an existing component motion pattern rather than rewriting it.

## Relevant skills found

The requested Vercel `find-skills` skill was installed globally with the Skills CLI. Catalog searches covered “design system audit,” “web design audit accessibility,” and “CSS design tokens.”

- `affaan-m/ecc@design-system` — 8.3K catalog installs. Broad and established, but much larger than this audit needs. Consider only if the team wants a general design-system architecture workflow.
- `edenspiekermann/skills@audit-design-system` — 183 installs. The source is reputable, but the skill audits Figma nodes for unbound variables and local overrides; it is not the right primary tool for this code-first audit.
- `dylanfeltus/skills@design-tokens` — 186 installs; the repository has 178 GitHub stars. Relevant for a later token implementation and contrast pass, but it is still a relatively small dependency.
- `intopia/intopia-web-accessibility-skill@intopia-web-accessibility` — 47 catalog installs; the repository has 34 GitHub stars and describes itself as experimental. Its component criteria and contrast script may be useful for a dedicated accessibility phase, with human review.

Recommendation: do not add another third-party skill for the current audit. The local CSS/React evidence is stronger and more specific. Reconsider the design-tokens or Intopia skill when Phase 1 or the accessibility verification pass begins.
