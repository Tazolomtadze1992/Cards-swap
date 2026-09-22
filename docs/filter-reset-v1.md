# Filter reset

Glossary (sidebar and empty state) and Resources now use the same FilterReset, composed from the shadcn-based Button with a reset appearance. It owns the leading decorative trash icon, 16px icon size, 8px gap, 48px minimum height, 12px/24px padding, fit-content width, light-blue surface and dark-blue text matching active filters, and .36 disabled opacity. The generic Button supplies focus-visible handling and native button semantics. Enabled reset buttons deepen the blue surface on hover using `--color-accent-subtle-hover-bg` with a 160ms background-color transition. The hover color holds chroma and hue steady while lowering OKLCH lightness from 0.92 to 0.88. Disabled buttons keep .36 opacity and do not respond to hover. Reduced-motion users get the color change without the color transition; existing keyboard focus and press behavior are preserved.

The page owns filter state and reset callbacks. Learning and Glossary mobile filter sheets also use this shared reset control. Removed the duplicated Glossary and filter CSS. Resources now follows the same icon order and fit-content mobile width as Glossary; the empty state also includes the icon.

Verified disabled → enabled → reset → disabled on Glossary and Resources at 1280px and 390px, with no control overflow. TypeScript, lint, and diff checks passed.
