# Buttons v1 — 2026-09-14

## Audit and scope

Audited the active homepage, Learning, Resources, Glossary, FAQ, and Articles implementation before editing. Captured all six at 1280×844 and 390×844. The linked ChatGPT audit could not be fetched; the available conversation and `design-system-audit.md`, current CSS, and actual rendering provided the baseline. The pre-existing glossary and global-token edits were preserved.

## Foundation and API

`src/components/ui/button.tsx` adapts the [shadcn Radix Button source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx): Radix Slot composition, CVA variants, native button props/ref, and data attributes. All visuals are local CSS modules using the established tokens. Installed only `@radix-ui/react-slot` and `class-variance-authority`; no theme reset or shadcn palette was added.

```tsx
<Button variant="primary">Action</Button>
<Button asChild variant="inverse" size="prominent">
  <Link href="/prototypes/learning">Start learning</Link>
</Button>
<Button variant="cardAction" size="resource" fullWidth>Resource</Button>
<Button size="icon" aria-label="Close">×</Button>
```

| Variant | Surface / text | Existing role |
| --- | --- | --- |
| primary | Primary action green / inverse cream | Contact on light pages; empty-state action; close |
| inverse | Cream surface / accent green | Contact on brand; hero action |
| overlay | 20% dark overlay / inverse cream | Homepage FAQ action |
| cardAction | 40% dark overlay / inverse cream | Resources; Learning variant 2 visual label |
| subtle | Subtle control surface / primary text | Article skip link |

Sizes: `compact`, `default`, `prominent`, `contact`, `resource`, `icon`. Contact keeps the existing responsive padding and 16px icon. Resource retains audited 14/22px optical padding; its 24px icon makes icon-bearing actions 56px tall, while text-only actions remain 52px. This is deliberate preservation, not a new fixed-height normalization. Other sizes use the existing 44/48/52px minimum-height tokens and spacing scale. Labels may expand vertically instead of clipping.

`className` and `style` are excluded from Button's public props. Page margins, positioning, and bottom alignment live on wrappers. Typography remains connected to the prototype's live tokens. Icons share size/spacing centrally.

Buttons default to `type="button"`. `asChild` preserves link semantics and destinations. Disabled native controls use `disabled`; composed links get `aria-disabled`, leave the tab order, and intercept clicks in capture before the child's handler can run. Icon buttons require an accessible label at the call site. No loading API was introduced because there is no current loading action.

## Changes

| Before | After |
| --- | --- |
| Header action styling duplicated by appearance | Shared primary/inverse Button with contact sizing |
| Hero and FAQ action CSS mixed styling with margins | Shared inverse/overlay Button; wrappers own margins |
| Resource action styles mixed sizing, color, and bottom placement | Shared cardAction Button; wrapper owns bottom placement |
| Article skip action had its own style | Shared subtle compact Button |
| Resource preview close and empty-state action had separate CSS | Shared icon and primary Buttons; refs and handlers retained |
| Learning variant 2 label had a separate button-like style | Shared non-interactive ButtonSurface inside the existing card link |
| Hover/focus/pressed/disabled rules were scattered or absent | Centralized states; hover only on hover-capable devices, token-based pressed shading, contextual focus ring, disabled opacity and behavior |

States change immediately; no animation or motion dependency was added. This preserves the current interaction timing and works with reduced motion.

## Boundaries

Filters, filter reset, alphabet selection, search controls, prototype switches, and accordion summaries remain separate controls. Learning's 96/68px age-continue button and Articles' 96/72px scenario CTA remain WIP and unchanged. Video thumbnails remain full-media triggers. The animated CardDeck's trigger and decorative revealed label remain private to its approved geometry/choreography; they are not independent nested buttons. Legacy unreferenced prototype files remain unchanged.

## Verification

- TypeScript, ESLint, production build, existing label-text tests, and whitespace checks passed.
- Browser captures and control measurements compared on all six routes at desktop and mobile. Migrated control dimensions, colors, typography, and positions match the baseline. Learning's desktop capture differed in scroll offset after heading focus, not document geometry. The FAQ action now has an 8px gap token, which has no visual effect with its single text child.
- Homepage screenshots matched pixel-for-pixel at both widths; mobile Resources, Articles, Learning, and FAQ also matched. Other full-page images contain capture differences from image/font/loading or developer overlays, so this is not a claim of universal pixel identity.
- Browser checks passed for semantic link navigation, hover, pressed state, focus-visible, Learning variant 2 labels, absence of nested buttons, resource preview open/close, Escape, and focus restoration.
- Temporary browser fixture verified default non-submit behavior, native disabled state, disabled composed-link click suppression (including the child's click handler), disabled tab exclusion, and reduced-motion behavior. Fixture removed after verification.
- No browser runtime errors in the interaction checks.

Not published; this is a local refactor.
