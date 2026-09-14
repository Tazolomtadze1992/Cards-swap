# Base color palette proposals

**Status:** Palette A selected; its base UI hierarchy now uses warm-neutral text with green reserved for accent roles; mixed card accents remain deferred  
**Fixed anchor:** `#FAF4EA`  
**Method:** recommendations follow the installed `oklch-skill`: constant hue within a family, lightness changes for contrast, equal lightness for equal perceived brightness, equal percentage of each hue's sRGB maximum chroma for comparable vividness, and gamut clamping at every step.

The original tables below record the palette selection. The implemented semantic mapping was subsequently narrowed: green no longer supplies primary and secondary text. See `color-v1-changes.md` for the warm-neutral role correction.

## Anchor conversions

| Current color | OKLCH conversion | Observation |
| --- | --- | --- |
| Cream `#FAF4EA` | `oklch(0.969 0.015 80.708)` | Approved, very light, low chroma. Keep exact. |
| Green `#005C53` | `oklch(0.426 0.076 183.445)` | At almost 100% of the sRGB chroma available at this lightness and hue. |
| Blue `#5EA8FF` | `oklch(0.722 0.148 253.765)` | Also at almost 100% of the available sRGB chroma. Its hue is compatible with the green under the skill's multi-hue rule; it is simply too light for cream text. |

## Palette A — preserve the current character (recommended)

This direction keeps the exact cream, exact green, and current blue hue. It separates the light blue accent from the darker blue required for an accessible action.

| Proposed role | OKLCH | sRGB preview | Intended pairing | WCAG contrast |
| --- | --- | --- | --- | ---: |
| Cream / canvas / inverse primary | `oklch(0.969 0.015 80.708)` | `#FAF4EA` | Green primary on cream; cream on green | 7.23:1 |
| Cream inverse secondary | `oklch(0.860 0.015 80.708)` | `#D6D0C6` | Secondary text on `#005C53` | 5.16:1 |
| Green primary | `oklch(0.426 0.076 183.445)` | `#005C53` | Primary green text on cream; green background with cream text | 7.23:1 |
| Green secondary | `oklch(0.500 0.089 183.445)` | `#007368` | Secondary green text on cream | 5.26:1 |
| Blue light accent | `oklch(0.722 0.148 253.765)` | `#5EA8FF` | Decorative/selected surface with dark ink | 6.11:1 with current `#20291B` ink |
| Blue strong action | `oklch(0.520 0.164 253.765)` | `#0068C4` | Cream text on blue action | 5.08:1 |
| Blue soft surface | `oklch(0.880 0.060 253.765)` | `#BDDAFF` | Green or dark text on a pale blue surface | 5.51:1 with `#005C53` |

The important decision is that `#5EA8FF` becomes a **light accent**, not the universal blue. The same hue supplies a darker action step. The installed skill specifically recommends fixing contrast through lightness while retaining hue; this is that rule applied to the current blue.

## Palette B — calmer base hues

If the green is still adjustable, reduce green and blue to 75% of the maximum sRGB chroma available at each lightness. This keeps their relative vividness aligned while making the system quieter. Cream remains exact.

| Proposed role | OKLCH | sRGB preview | Intended pairing | WCAG contrast |
| --- | --- | --- | --- | ---: |
| Cream / canvas / inverse primary | `oklch(0.969 0.015 80.708)` | `#FAF4EA` | Same fixed anchor | — |
| Cream inverse secondary | `oklch(0.860 0.015 80.708)` | `#D6D0C6` | Secondary text on dark green | >5:1 |
| Green primary, 75% chroma | `oklch(0.426 0.057 183.445)` | `#255952` | Primary green text/background | 7.30:1 on cream |
| Green secondary, 75% chroma | `oklch(0.500 0.067 183.445)` | `#307067` | Secondary green text on cream | 5.27:1 |
| Blue light accent, 75% chroma | `oklch(0.722 0.111 253.765)` | `#73A9E9` | Accent surface with dark ink | — |
| Blue strong action, 75% chroma | `oklch(0.520 0.123 253.765)` | `#2F6AAE` | Cream text on blue action | 5.06:1 |
| Blue soft surface, 75% chroma | `oklch(0.880 0.045 253.765)` | `#C4DAF5` | Green or dark text | 5.53:1 with current green |

This option is more restrained, but it gives up exact `#005C53`. Palette A is therefore the better starting point if that green already feels established.

## Blue hue alternatives

The skill cannot decide which hue fits the brand; it can make alternatives perceptually comparable. These light-blue candidates all use `L = 0.720` and 100% of the maximum sRGB chroma available at their hue, so brightness and relative vividness are aligned.

| Direction | Light accent | Strong action at `L = 0.520` | Character |
| --- | --- | --- | --- |
| Cyan blue, `H = 240` | `oklch(0.720 0.163 240)` / `#0EAFFF` | `oklch(0.520 0.119 240)` / `#0070A6` | More energetic and closer to teal |
| Current-family blue, `H = 253.765` | `oklch(0.720 0.149 253.765)` / `#5DA7FF` | `oklch(0.520 0.164 253.765)` / `#0068C4` | Clear blue; recommended continuity |
| Periwinkle blue, `H = 260` | `oklch(0.720 0.146 260)` / `#6DA4FF` | `oklch(0.520 0.212 260)` / `#005DE0` | Slightly more violet and expressive |

There is no technical reason from the skill to add a fourth base hue now. Cream, green, and one blue family can cover canvas, inverse text, primary text, brand surfaces, links, focus, selected states, and actions. Status and decorative card colors can be handled later as separate families.

## Transparency guidance from the skill

The skill explicitly supports transparency. It converts alpha colors to slash syntax such as `oklch(0 0 0 / 0.2)`, and it documents opacity modifiers such as `bg-brand-500/50`. Therefore, black at 10%, 20%, or 30% is not inherently bad practice.

The deciding factor is whether the resulting color is allowed to change with its background:

| Use | Recommendation | Reason derived from the skill |
| --- | --- | --- |
| Scrims, image overlays, hover washes | Keep alpha | Blending with the underlying surface is the intended effect. Use named tokens and slash syntax. |
| Secondary text | Prefer an opaque palette shade | The skill says contrast belongs to the foreground/background pair and is controlled through lightness. Alpha makes the final foreground depend on every background beneath it. |
| Borders and focus rings | Prefer opaque shades when visibility is required | A 10% or 20% overlay can meet contrast on one surface and miss it on another. Test the actual composite against the 3:1 UI target if alpha is kept. |
| Buttons on variable card colors | Use an explicit foreground/background pair | One translucent black control cannot guarantee contrast across pale and dark card accents. |
| Disabled controls | Alpha can express the disabled state | It is still better as a named state token than repeated raw opacity values. |

Suggested alpha token shape, without committing values yet:

```css
--color-overlay-hover: oklch(0 0 0 / 0.1);
--color-overlay-control: oklch(0 0 0 / 0.2);
--color-overlay-scrim: oklch(0 0 0 / 0.8);
```

Do not create a generic “black 10/20/30” scale and use it for every role. Name alpha tokens by purpose, because the same percentage has different visual and contrast results on cream, green, blue, and future card colors.

## Implemented starting point

Palette A now locks `#FAF4EA` as both canvas and the light/inverse primary, retains `#005C53` as the main green, retains the current blue hue, and splits blue into light-accent and strong-action steps. The opaque cream and green secondary candidates supply the first contrast-tested secondary roles. Full 50–950 ramps remain deferred until these semantic pairings have been reviewed in use; those scales should then use constant hue, consistent relative chroma, and gamut clamping.
