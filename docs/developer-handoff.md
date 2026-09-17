# Developer handoff

Reviewed 16 September 2026. This repository is an interactive frontend reference, with sample content and local React state. It is ready for implementation discussion; the open items below must be resolved before a public launch.

## Start here

Use Node.js and the pnpm version pinned in `package.json`. Install with `pnpm install --frozen-lockfile`, then `pnpm dev`. `/` redirects to `/prototypes/homepage`. The development port defaults to 3000; the design review instance uses 3015.

Run `pnpm lint`, `pnpm exec tsc --noEmit`, `node --test tests/*.test.mjs`, and `pnpm build`. Use `pnpm start` to serve the production build. No password gate is included.

The current machine's pnpm launcher attempted to reinstall its existing modules before running scripts and stopped at a noninteractive purge prompt. Validation succeeded using the installed ESLint, TypeScript and Next CLIs directly; a clean-machine frozen-lockfile install remains to be verified. Do not treat the local build as proof of a fresh install.

## Route and component map

| Area | Entry | Implementation |
| --- | --- | --- |
| Homepage and navigation | `/prototypes/homepage` | `src/components/homepage-prototype/`, shared `site-header.tsx` |
| Learning and age selection | `/prototypes/learning`, `/6-9`, `/14-18` | `learning-page.tsx`, `learning-data.ts`, `teen-learning-data.ts` |
| Article sample | `/prototypes/articles` | Article components in `homepage-prototype/`; `?age=6-9` preserves young flow |
| Practice samples | `/prototypes/learning/practice/{scenario,quiz,long-quiz}` | `src/components/learning-flow/`; `?age=6-9` enables immediate feedback |
| Resources | `/prototypes/resources` | `resources-page.tsx`, `resources-data.ts` |
| Glossary / FAQ | `/prototypes/glossary`, `/prototypes/faq` | Matching page and data files in `homepage-prototype/` |
| Services | `/prototypes/services` | `services-page.tsx`, service dialogs, `src/components/services/` |

Shared typography, color and spacing tokens live in `src/app/globals.css`; reusable controls live in `src/components/ui/`. Retain shared components when integrating instead of duplicating page-specific controls. Public illustrations, fonts and review icons are under `public/`.

The app currently uses Next.js routing and React. For Laravel integration, agree on React/Inertia versus a port before estimating work; Next links, image handling, page metadata and route loaders require adaptation. `/prototypes` paths and prototype page titles are review conventions, not a final production URL decision.

## Content and integration work remaining

| Priority | Open item | Required decision or implementation |
| --- | --- | --- |
| Before launch | Age 6–9 currently reuses 10–13 cards and activity copy, including the 12-year-old scenario character | Content owner supplies approved age-specific copy, questions and illustrations; preserve immediate feedback behavior |
| Before launch | Teen cards explicitly contain preview copy | Approve 14–18 material and connect its own articles and activities |
| Before launch | Learning cards share the same article destination; teen links also use that sample | Add topic IDs/slugs and map each article, scenario, quiz and onward step |
| Before launch | Recommended media are unrelated catalogue fixtures; videos and files open placeholder previews | Supply final media/files, age suitability and per-topic associations; connect playback and downloads |
| Before launch | Resource catalogue is temporary; its age labels use 9–13 / 13–18 while learning uses 10–13 / 14–18 | Content owner agrees one age taxonomy and developer maps filtering consistently |
| Before launch | Header Contact links to the homepage FAQ anchor | Confirm the intended contact destination and connect it |
| Before launch | Service descriptions and contact details are embedded locally | Content owner validates details and defines how they will stay current |
| Integration | Answers exist only in component memory and reset on leaving/reloading | Decide whether anonymous transient progress is sufficient; there is no server persistence or analytics |
| Integration | CMS and complete learning-package orchestration are absent | Define content schema and ownership; preserve answer IDs, correct indexes, explanations and ordered scenario steps |

## Interaction requirements to preserve

- Age picker: selection required before Continue; shared X returns to homepage at every screen size. Escape is currently suppressed—decide whether it should also return home before launch.
- Learning: 6–9 shows the correct answer/explanation immediately after selection and locks that question; older fixtures defer feedback to review. A new question starts unanswered.
- Completion: centered score inside a blue/neutral ring with round ends. Zero correct answers has no blue dot. Skipping omits personal grading but still allows correct-answer review.
- Review: square neutral cards, blue check and cream X assets; individual review X returns to the answer overview. Incorrect-answer cards have no redundant “your answer” status line.
- Definitions: highlighted bold terms open on mouse hover or click/tap; keyboard activation and dismissal must remain available. Definitions inside dialogs remain in the dialog layer.
- Mobile navigation: full viewport menu, page scroll lock, bottom contact action with safe-area clearance, visible keyboard focus. Preserve reduced-motion alternatives already in the project.

## Validation and acceptance

See [handoff-validation.md](handoff-validation.md) for the actual checks run and their limits. Historical screenshots and older audit reports are reference material, not evidence of current exhaustive QA.

Before launch, complete a fresh install, real iOS/Android touch checks, keyboard and screen-reader checks across every dialog/filter, final content review, and a deployed-site check of real media and contact destinations. This pass does not certify accessibility conformance.

## Related notes

- [Learning handoff](learning-handoff.md)
- [Services handoff](services-handoff.md)
- [Homepage](homepage-handoff.md), [cards](cards-handoff.md), [articles](articles-handoff.md), [resources](resources-handoff.md), [glossary](glossary-handoff.md), [FAQ](faq-handoff.md)

This document takes precedence where historical design notes describe removed controls or outdated colors. After these integration decisions, a focused motion pass can address abrupt transitions without reopening the approved layout.

## First motion pass

Desktop service dialogs and the age picker use 200ms entry / 150ms exit with a
0.98 scale; the mobile navigation uses 220ms / 160ms and an 8px upward offset.
Filter popovers/selects use 150ms / 100ms and a 0.97 scale from Radix's trigger
origin. All share `cubic-bezier(0.25, 1, 0.5, 1)` in `surface-motion.tsx`.
The Web Animations API animates only opacity and transform, preserves the current
visual state when reversed, and keeps closing surfaces mounted until completion.
Keyboard-triggered transitions complete immediately; reduced motion uses fades
of at most 120ms. Existing Vaul sheets retain their own gesture behavior.

Removed resource-thumbnail hover zoom. Mobile card-stack keyboard cycling and
reduced-motion rearrangement are instantaneous; pointer swipes retain the existing
spring. The header's explicit reduced-motion fade survives the global fallback.
Approved desktop homepage card choreography remains unchanged.

Verified with TypeScript, ESLint, focused timing/reduced-motion checks, and browser
checks for age selection, filter selection, menu reopening, repeated keyboard card
cycling, Escape dismissal, focus restoration, and scroll-lock cleanup. Real-device
swipe feel and frame-rate profiling remain a separate motion QA step.
