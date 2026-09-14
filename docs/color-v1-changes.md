# Palette A implementation inventory

Palette A is applied to the shared base UI. Illustration colors and the mixed homepage, Resources, and Learning card palettes remain unchanged, except that the homepage blue card's pure-white ink now uses the approved cream.

## Hierarchy correction

The initial semantic mapping made both primary and secondary text green. The follow-up replaces those roles with a low-chroma warm-neutral ramp at the cream hue, while preserving green for the brand surface, active navigation, selected controls, focus, and filled actions.

| Role | Primitive | Contrast on cream |
| --- | --- | ---: |
| Primary text | `oklch(0.3 0.012 80.708)` | 12.47:1 |
| Secondary text | `oklch(0.43 0.014 80.708)` | 7.41:1 |
| Component background | `oklch(0.94 0.008 80.708)` | n/a |
| Component hover / subtle border | `oklch(0.9 0.01 80.708)` | n/a |
| Default border | `oklch(0.84 0.012 80.708)` | n/a |

Default filters now use neutral text and surfaces. Selected filters use a pale green background, green border, and green label instead of a solid green fill. On light headers, inactive navigation is neutral and the current item carries the green accent with its existing underline. Contact remains the single filled header action.

The table lists every authored color value changed in this pass. Several values map to more than one semantic token because their previous use covered several roles.

| Before | After |
| --- | --- |
| `#faf4ea` / `#FAF4EA` | `--color-cream-primary: oklch(0.969 0.015 80.708)` and semantic canvas, surface, and inverse-text aliases |
| `#fdf9ed` | `var(--color-canvas)` or `var(--color-surface)` |
| `#fffdf7`, `#fff`, `white` | `var(--color-surface)` or `var(--color-text-inverse)` according to role |
| Homepage blue-card ink `#ffffff` | Approved cream `#FAF4EA` in the DialKit-compatible color data |
| `#005c53` / `#005C53` | `--color-green-primary: oklch(0.426 0.076 183.445)` and semantic brand/text aliases; DialKit-compatible page data retains `#005C53` |
| `#00403a` | `var(--color-text-primary)` |
| `#00384b` / `#00384B` | `var(--color-text-primary)`, `var(--color-brand)`, or `var(--color-focus)` according to role |
| `#737373` | `--color-green-secondary: oklch(0.5 0.089 183.445)` through `var(--color-text-secondary)` |
| `#5a3a00` | `var(--color-text-primary)` or `var(--color-brand)` |
| `#151515`, article heading `#000` | `var(--color-text-primary)` |
| Article copy `#4b4b4b` | `var(--color-text-secondary)` |
| Inverse secondary `#f2f2f2`, `#e0e0e0`, hover `#eee3d2` | `--color-cream-secondary: oklch(0.86 0.015 80.708)` through `var(--color-text-inverse-secondary)` |
| CTA `#5ea8ff` | `--color-blue-strong: oklch(0.52 0.164 253.765)` through the primary-action background token |
| Selected border `#5ea8ff` | `var(--color-blue-strong)` |
| Selected fill `#5ea8ff26` | `--color-blue-soft: oklch(0.88 0.06 253.765)` through `var(--color-accent-soft)` |
| `#5a3a000d` | `--color-control-subtle-bg: oklch(0.426 0.076 183.445 / 0.05)` |
| `#00384b18`, `#5a3a001a`, `#5a3a001f`, `#20291b24` | `--color-border-subtle: oklch(0.426 0.076 183.445 / 0.12)` |
| `#00384b55`, control border `#5a3a0030` | `var(--color-border-default)` |
| Popover shadow `#5a3a0030` | `--shadow-popover` using green at 19% alpha |
| `#5a3a0066`, `#005c53a6`, `#20291ba6` | Opaque `var(--color-text-secondary)` |
| `#faf4eae6` | Opaque `var(--color-surface)` |
| `#ffffff12` | `--color-border-inverse: oklch(0.969 0.015 80.708 / 0.12)` |
| `#ffffff30` | `--color-control-inverse-hover-bg: oklch(0.969 0.015 80.708 / 0.19)` |
| `#0000001a` | `--color-overlay-hover: oklch(0 0 0 / 0.1)` |
| `#0003` | `--color-overlay-soft: oklch(0 0 0 / 0.2)` |
| `#0006` | `--color-overlay-control: oklch(0 0 0 / 0.4)` |
| `#00000078` | `--color-overlay-control-hover: oklch(0 0 0 / 0.47)` |
| `#00000040` hover | `var(--color-overlay-control)` |
| `#20291bcc`, `#000c` | `--color-overlay-scrim: oklch(0 0 0 / 0.8)` |
| Modal shadow `#0006` / `rgb(0 0 0 / 40%)` | `--shadow-modal` using `oklch(0 0 0 / 0.4)` |
| `#ffcfcf80` | `--color-danger-soft: oklch(0.896 0.054 18.216 / 0.5)` |
| `#cc3033` | `--color-danger: oklch(0.557 0.192 25.247)` |
| Page/preview uses of `#20291b` | `var(--color-text-primary)` or `var(--color-brand)`; content-card ink uses are deferred |
| Page-level `#393939` | `var(--color-text-primary)`; content-card ink uses are deferred |
