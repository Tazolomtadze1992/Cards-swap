# Filter reset

Glossary (sidebar and empty state) and Resources now use the same FilterReset, composed from the shadcn-based Button with a reset appearance. It owns the leading decorative trash icon, 16px icon size, 8px gap, 48px minimum height, 12px/24px padding, fit-content width, soft coral surface, and .36 disabled opacity. The generic Button supplies focus-visible handling and native button semantics. Reset retains its quiet surface without added motion or pressed shading.

The page owns filter state and reset callbacks. Learning currently has no reset control. Removed the duplicated Glossary and filter CSS. Resources now follows the same icon order and fit-content mobile width as Glossary; the empty state also includes the icon.

Verified disabled → enabled → reset → disabled on Glossary and Resources at 1280px and 390px, with no control overflow. TypeScript, lint, and diff checks passed.
