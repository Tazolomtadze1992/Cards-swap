# Current color audit

**Audit date:** 2026-09-13  
**Source state:** working tree based on `6d5eccf`, including the current uncommitted typography-token work  
**Scope:** the active cards, homepage, FAQ, glossary, resources, articles, and learning prototypes; global theme declarations; the older unreferenced prototype; and SVG artwork  
**Intent:** document the implementation before rebuilding its palette in OKLCH. No color values or UI behavior were changed.

> Historical baseline: this report and its generated inventory capture the state before Palette A was implemented. See [color-v1-changes.md](./color-v1-changes.md) for the subsequent mapping.

## Executive finding

The visible product has a recognizable direction—warm canvases, dark green brand areas, dark text, a light blue action color, and playful card accents—but it does not yet have a functioning color system.

The active source contains **185 color occurrences and 67 normalized values** (including alpha colors, `transparent`, and `currentColor`). The code already declares 13 “canonical active product tokens” in `globals.css`, but **none of the active components reference those `--color-*` or `--shadow-*` tokens**. The global body and focus styles still reference an older palette, while every active page repeats raw literals. Consequently, the apparent token layer is documentation rather than an implementation contract.

The largest risks are:

1. the light blue `#5ea8ff` is used as an action, focus/selection cue, content accent, and card background although it cannot support the current light text;
2. warm neutral and text roles split across several near-identical values without clear semantic differences;
3. a brown control system (`#5a3a00` plus six alpha variants) exists only in component CSS and is absent from the proposed globals;
4. translucent controls produce different contrast on different card accents; and
5. status coverage consists only of danger/reset, with no defined success, warning, or information roles.

## Inventory summary

| Source group | Occurrences | Raw spellings | Normalized values | Interpretation |
| --- | ---: | ---: | ---: | --- |
| Active component source | 185 | 71 | 67 | Product UI literals and runtime card data |
| Global stylesheet | 29 | 28 | 28 | Two competing declaration sets plus global defaults |
| Unreferenced legacy prototype | 35 | 13 | 13 | Kept separate; not part of active product decisions |
| SVG artwork | 473 | 51 | 50 | Illustration-local colors and opacities; not UI tokens by default |

There are **no authored CSS gradients and no SVG gradient definitions**. Layering comes from alpha colors, element opacity, shadows, backdrops, image brightness filters, and backdrop blur.

The complete value-by-value list, with every source location, is in [color-audit/inventory.md](./color-audit/inventory.md). Its machine-readable counterpart is [color-audit/inventory.json](./color-audit/inventory.json), and [color-audit/extract.py](./color-audit/extract.py) regenerates both inventories and the contrast appendix.

## Current semantic roles

This table describes how colors behave today. It does not endorse or redesign them.

| Role | Current values | Current use and inconsistency |
| --- | --- | --- |
| Canvas | `#faf4ea`, `#fdf9ed` | Most screens use the first; Learning uses the second. No stated product distinction. Global body instead uses legacy `#fffbf2`, visible if a screen does not override it. |
| Surface | `#fffdf7`, `#fff` / `white`, translucent `#faf4eae6` | Popovers use `#fffdf7`; learning card interiors and some controls use pure white; glossary search/reset use a 90% canvas tint. These are visually close but structurally unrelated. |
| Brand | `#005c53`, strong `#00403a` | Dark green anchors hero, FAQ, glossary, inner-page header actions, and button text. This is the most coherent family. |
| Text: primary | `#20291b`, `#393939`, `#151515`, `#000`, `#5a3a00`, `#00384b` | At least six dark colors carry primary or heading text. Choice follows page/component history more than role. |
| Text: secondary | `#737373`, `#4b4b4b`, `#f2f2f2`, `#e0e0e0`, alpha versions of brown/green/dark ink | Secondary text is implemented through both separate literals and opacity, so its final appearance depends on its surface. |
| Border/divider | Alpha brown, alpha navy, alpha white, alpha ink, transparent | Dividers use `#5a3a001a` or `#5a3a001f`; glossary uses `#ffffff12`; preview uses `#20291b24`; prototype switcher uses `#00384b18`. Equivalent hierarchy levels have different hues and opacities. |
| Interactive default | Brown `#5a3a00` with `#5a3a000d`, brand green, light blue `#5ea8ff`, dark translucent fills | Brown governs filters and article controls but is missing from global product tokens. Green governs navigation/brand actions. Blue governs prominent next/continue and selection. Dark overlays govern actions placed on accent cards. |
| Focus/selection | `#00384b`, legacy global `#1cb0f6`, `#5ea8ff` | Learning overrides global focus with dark navy. Other active pages inherit the legacy bright-blue focus ring. Selected age uses light blue. Focus therefore changes by route and can fall below the 3:1 non-text target. |
| Danger | `#cc3033` on `#ffcfcf80` | Used only for “clear filters.” Its text contrast is slightly below 4.5:1 in the enabled state. No other status families exist. |
| Overlays/elevation | `#20291bcc`, `#000c`, `#0003`, `#0006`, `#00000078`, brown/black shadows | Modal backdrops use two different base hues. Reusable overlay/shadow tokens are declared globally but bypassed. |
| Content accents | Greens, blues, purples, coral, yellow, pink, mauve, mint | Cards use multiple unrelated lists in `cards-prototype.tsx`, `resources-data.ts`, and `learning-page.tsx`. Color assignment usually cycles by index, so it does not consistently encode topic, resource type, age, or status. |
| Illustration colors | 50 normalized values inside SVG files | These belong to individual illustrations. Promote only values that must align with a UI role; otherwise keep them asset-local. |

## Duplication and inconsistent usage

### Strong near-duplicate candidates

These candidates were found among active opaque literals using an OKLab distance below 0.025. That threshold identifies review candidates, not automatic replacements.

| Candidate pair | OKLab distance | Audit interpretation |
| --- | ---: | --- |
| `#ada3e4` / `#aea3e3` | 0.00200 | Almost certainly accidental spelling drift across Resources and Learning. |
| `#301912` / `#331a13` | 0.00787 | Separate card inks with no documented role distinction. |
| `#fffdf7` / `#fff` | 0.01019 | Surface versus pure white may be intentional, but current naming and use do not explain it. |
| `#faf4ea` / `#fdf9ed` | 0.01330 | Two page canvases with no documented semantic boundary. |
| `#fdf9ed` / `#fffdf7` | 0.01451 | Learning canvas and popover surface are extremely close. |
| `#f2f2f2` / `#faf4ea` | 0.01672 | Dark-surface secondary text and inverse canvas text are close enough to question the extra value. |
| `#fdf9ed` / `#fff` | 0.02437 | Another warm-white/pure-white boundary that needs an explicit surface rule. |

There is also literal-format drift: `#5EA8FF` / `#5ea8ff`, `#00384B` / `#00384b`, and `#fff` / `#ffffff` / `white` normalize to the same colors. The extractor normalizes these, but the source does not.

### Same role, different values

- Primary copy alternates between `#20291b`, `#393939`, and `#4b4b4b`.
- Page headings alternate among `#00384b`, `#5a3a00`, `#151515`, and black.
- Light inverse text alternates among `#faf4ea`, `#fdf9ed`, `#f2f2f2`, `#e0e0e0`, and white.
- Page-level modal backdrops use green-black `#20291bcc` in Resources and black `#000c` in Learning.
- Filters on Resources and Learning duplicate the same brown family rather than sharing a semantic contract.
- The same blue is a brand-adjacent accent, CTA fill, selected border, selected soft fill, and card category background.

### Same value, different roles

- `#5ea8ff` acts as a content card background, primary action, selection border, and soft selection source.
- `#00384b` acts as focus, switcher ink/fill, selected-state text, and page heading.
- `#faf4ea` acts as canvas, inverse text, control fill, dialog surface, and icon stroke.
- `#5a3a00` acts as heading, body/control text, active control fill, checkbox accent, empty-state action, and the source color for borders/shadows/muted text.

Those overlaps are not automatically wrong, but they make future palette changes unsafe: changing one value to improve a CTA can unintentionally alter content categorization or focus visibility.

## Contrast and hierarchy findings

Contrast was calculated with the WCAG 2 sRGB formula and unrounded alpha compositing. Normal text is checked against 4.5:1; visible UI boundaries are checked against 3:1. These are the published [WCAG 2.2 text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) thresholds. Disabled controls are recorded but are exempt from the WCAG minimum. This is a static source audit, so image-backed controls and every transient browser state still need visual/browser verification.

| Severity | Pair/state | Ratio | Finding |
| --- | --- | ---: | --- |
| High | White label on `#5ea8ff` Continue / Resources card | 2.46:1 | Fails normal text; the card heading also falls below 3:1 for large text. |
| High | `#faf4ea` label on `#5ea8ff` article Next | 2.25:1 | Fails normal text. |
| High | 40%-alpha brown result count on warm canvases | 2.09–2.11:1 | Fails normal text and makes the result hierarchy too faint. The adjacent strong count creates a sharp, unnecessary legibility split within one sentence. |
| High | Dark ink and its 15%-black pill on dark green resource card `#2d944d` | 3.91:1 / 2.97:1 | Both fall below 4.5:1. One rotating content accent makes otherwise shared card text unreliable. |
| High | Translucent dark CTA with light text on card accents | 3.30–4.17:1 on mint, lavender, and pale blue | A shared alpha treatment cannot guarantee label contrast across variable backgrounds. |
| Medium | Glossary placeholder over translucent search surface | 3.05:1 | Fails normal placeholder text. |
| Medium | Muted header `#737373` on `#faf4ea` | 4.33:1 | Just below 4.5:1. The same color reaches 4.50:1 on Learning's lighter canvas, so route background changes alter compliance. |
| Medium | Enabled danger text on the composited soft-danger surface | 4.21:1 | Slightly below 4.5:1. |
| Medium | Global `#1cb0f6` focus ring on `#faf4ea` | 2.23:1 | Below the 3:1 visible-boundary target. It is inherited by active routes that do not override focus. |
| Medium | `#5ea8ff` selected-age border against dialog / soft selection fill | 2.34:1 / 2.08:1 | Below 3:1, so color alone supplies a weak selection boundary. |

Full tested pairs, including passes and background-specific card results, are in [color-audit/contrast.md](./color-audit/contrast.md).

Beyond the numeric failures, hierarchy is unstable because “muted” is sometimes a named gray, sometimes an alpha of the local foreground, and sometimes a separate light color on dark surfaces. Alpha-derived text is especially fragile: moving it onto a different surface changes its effective color and contrast. Similarly, the content accents span pale and relatively dark colors while shared text/control recipes assume one luminance range.

## Proposed token architecture

Keep the next system in three layers. The architecture below intentionally contains role names, not new values.

### 1. Primitive palette

Primitives store OKLCH values and describe color families only:

```css
--neutral-warm-*;
--neutral-*;
--brand-*;
--accent-blue-*;
--danger-*;
--success-*;
--warning-*;
--info-*;
--content-green-*;
--content-blue-*;
--content-purple-*;
--content-coral-*;
--content-yellow-*;
```

Use a small numeric scale such as `50–950`. Create only the families and steps that semantic tokens actually consume. Keep illustration-only colors inside their SVGs.

### 2. Semantic product tokens

Semantic tokens are the default API for product UI:

```css
/* Canvas and surfaces */
--color-bg-canvas;
--color-bg-canvas-subtle;
--color-bg-surface;
--color-bg-surface-raised;
--color-bg-inverse;

/* Text and icons */
--color-fg-primary;
--color-fg-secondary;
--color-fg-tertiary;
--color-fg-inverse;
--color-fg-brand;
--color-fg-link;

/* Borders */
--color-border-subtle;
--color-border-default;
--color-border-strong;
--color-border-inverse;
--color-border-focus;

/* Actions and states */
--color-action-primary-bg;
--color-action-primary-fg;
--color-action-primary-hover;
--color-action-secondary-bg;
--color-action-secondary-fg;
--color-action-selected-bg;
--color-action-selected-fg;
--color-action-disabled-bg;
--color-action-disabled-fg;

/* Status */
--color-status-danger-bg;
--color-status-danger-fg;
--color-status-success-bg;
--color-status-success-fg;
--color-status-warning-bg;
--color-status-warning-fg;
--color-status-info-bg;
--color-status-info-fg;

/* Layering */
--color-overlay-scrim;
--color-overlay-control;
--shadow-popover;
--shadow-modal;
```

Give every background token an intended foreground partner. This makes contrast a property of the pair rather than a hope attached to a single swatch. Avoid semantic text tokens expressed as alpha unless their parent surface is fixed and tested.

### 3. Content-accent pairs

Treat card accents as paired themes rather than independent swatches:

```css
--color-content-1-bg;
--color-content-1-fg;
--color-content-1-control-bg;
--color-content-1-control-fg;
/* Repeat only for the number of approved content themes. */
```

First decide whether these colors encode a category. If they do, assign stable names such as `--color-content-video-*` or `--color-content-practice-*`. If they are decorative, use neutral numbered themes and do not imply meaning. Each pair must pass on its own; one translucent button recipe should not be expected to work across all accents.

Component aliases such as `--filter-trigger-bg` should be introduced only where a component genuinely needs a stable contract beyond the semantic layer. They should point to semantic tokens, never duplicate primitive values.

## Recommended next phase

1. Confirm the intended semantic distinctions: one versus two warm canvases; warm surface versus pure white; whether brown is an interaction family; and whether content colors encode meaning.
2. Choose anchor colors from the current direction, then build the minimum OKLCH primitive scales.
3. Resolve each foreground/background pair against WCAG and APCA targets before mapping components.
4. Replace literals role by role, beginning with canvas/surface/text/border, then brand/actions/focus/status, then content pairs.
5. Keep the legacy prototype palette and illustration-local colors outside the product token migration unless a live dependency is found.

That sequence preserves the current design direction while making the eventual palette rebuild measurable and safe.

## Audit limits

- Source extraction covers text files under `src/` and `public/`; raster image pixels and video frames are not palette candidates and were not sampled.
- SVG values are inventoried even when an asset may not be rendered on a current route; they are intentionally separated from product UI colors.
- Contrast checks cover representative deterministic combinations found in source. Image thumbnails, anti-aliasing, browser-computed inheritance, hover/focus combinations, and motion states require a later rendered-state review.
- Near-duplicate detection is a clustering aid. Product intent decides whether two values should merge.
