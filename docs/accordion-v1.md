# Accordion v1

The shared FAQ now uses the shadcn/Radix Accordion foundation with the prototype's existing appearance. Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/accordion.tsx (MIT). Only `@radix-ui/react-accordion` was installed; no shadcn theme styles or animations were imported.

## Structure

- `src/components/ui/accordion.tsx`: Accordion, AccordionItem, AccordionTrigger, AccordionContent wrappers; primitive props and refs retained, `className`/`style` excluded from the public styling API.
- `src/components/ui/accordion.module.css`: row surface/radius, trigger typography and spacing, answer measure, inherited focus colors, and existing plus-to-close indicator.
- `src/components/homepage-prototype/faq-list.tsx`: maps FAQ content to a single, collapsible accordion, initially closed. `fullPage` selects the existing list width and heading level (h2 below the FAQ page h1, h3 below the homepage section h2). `name` remains a list identifier; each accordion manages its own selection.
- `faq-list.module.css`: page-specific list widths and existing natural/Mtavruli typography toggle.

| Before | After |
| --- | --- |
| Shared FaqList lived inside homepage-sections and rendered details/summary | Dedicated FaqList uses shadcn-style Radix composition on both pages |
| FAQ styling mixed with homepage layout | Shared Accordion owns token-based visuals; FaqList owns width and text presentation |
| Summary labels without heading elements | Heading-wrapped triggers with Radix state and ARIA relationships |
| Native click/keyboard disclosure | Radix single/collapsible behavior plus Arrow, Home, and End navigation |

Preserved colors, row radii, 32px padding, 24px icon/gap, 16px row gap, typography tokens, 760px answer measure, list widths, Georgian copy, plus icon asset and 45-degree open rotation. No new hover, pressed, disabled styling, transitions, or animations; further state/motion design is deferred. Button work and pre-existing glossary/global edits remain intact.

## Verification

Captured homepage and FAQ at 1280×844 and 390×844, with every item closed and with the first item open. All trigger text, positions, dimensions, typography, and colors matched baseline measurements. FAQ page screenshots matched pixel-for-pixel in all four cases; homepage desktop screenshots also matched. Mobile homepage differences were confined to the unrelated animated card area; the FAQ section matched.

Browser checks passed on both routes: initially closed, open one/close previous, toggle closed, Enter/Space, ArrowDown, Home/End, visible keyboard focus, heading hierarchy, trigger/content ARIA relationships, natural/Mtavruli typography toggle, reduced-motion with no animation, and no browser runtime errors.

TypeScript, ESLint, production build, existing label-text tests, and diff whitespace checks passed. Verification screenshots and scripts are in `/tmp/faq-audit/`. This is a local change, not a deployment.
