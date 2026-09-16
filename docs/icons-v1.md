# Icons v1

The approved prototype pages use the free Hugeicons Stroke Rounded set through the shared `Icon` component.

## Rules

- Use semantic names from `src/components/ui/icon.tsx`; pages and components do not import individual Hugeicons.
- Icons inherit the surrounding text color and use a default `2.5` stroke width.
- Active interface icons use `16` pixels. Accordion Plus/Minus icons use `20` pixels, and the existing `32` pixel scenario CTA arrow remains an intentional exception for now.
- Stroke width is fixed to the approved `2.5` default across prototype pages.
- Accordion questions show `plus` while closed and `minus` while open.
- `close` remains a separate icon for dialogs, search clearing, and future dismiss actions.
- Logos, content illustrations, and resource artwork remain image assets rather than interface icons.

## Current semantic map

| Name | Use |
| --- | --- |
| `check` | Selected filter option |
| `chevronDown` / `chevronUp` | Filter state |
| `chevronsRight` | Forward or skip action |
| `close` | Dismiss or clear |
| `download` | Download action |
| `minus` / `plus` | Accordion state |
| `phone` | Contact action |
| `play` | Video preview |
| `search` | Search field |
| `trash` | Clear filters |

The older animated CardDeck prototype is outside this pass and may retain its existing icons until that prototype is migrated or removed.
